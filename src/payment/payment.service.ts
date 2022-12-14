import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { STRIPE_CLIENT } from 'src/utils/option';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { PaymentEmployerDto } from 'src/utils/dto/payment.employer.dto';
import { AccountEnum } from 'src/utils/enum';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(STRIPE_CLIENT) private readonly stripe: Stripe,
    private prismaService: PrismaService,
  ) {}

  async employer_checkout(
    account_type: string,
    paymentEmployerDto: PaymentEmployerDto,
  ) {
    //Create payment employer session
    const checkout = await this.stripe.checkout.sessions.create({
      customer_email: paymentEmployerDto.user_email,
      currency: 'myr',
      line_items: [{ price: paymentEmployerDto.product_api, quantity: 1 }],
      mode: 'payment',
      success_url: 'http://localhost:3001/reload/success/{CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3001/reload/unsuccessful',
      metadata: {
        account_type,
        user_email: paymentEmployerDto.user_email,
        employer_profile_id: paymentEmployerDto.employer_profile_id,
        product_id: paymentEmployerDto.product_id,
        product_name: paymentEmployerDto.product_name,
        product_api: paymentEmployerDto.product_api,
        product_price: paymentEmployerDto.product_price,
        product_credit_value: paymentEmployerDto.product_credit_value,
      },
    });

    return { checkout: checkout.url };
  }

  async store_transaction(session: any) {
    if (session.metadata.account_type === AccountEnum.EMPLOYER) {
      const store = await this.prismaService.employer_Transaction.create({
        data: {
          account_type: session.metadata.account_type,
          employer_profile_id: session.metadata.employer_profile_id,
          employer_product_id: session.metadata.product_id,
          intent_id: session.payment_intent,
          session_id: session.id,
          product_name: session.metadata.product_name,
          product_api: session.metadata.product_api,
          product_price: new Prisma.Decimal(
            parseFloat(session.metadata.product_price),
          ),
          employer_email: session.metadata.user_email,
          product_credit_value: parseInt(session.metadata.product_credit_value),
          amount_subtotal: new Prisma.Decimal(session.amount_subtotal),
          amount_total: new Prisma.Decimal(session.amount_total),
          amount_tax: new Prisma.Decimal(session.total_details.amount_tax),
          amount_discount: new Prisma.Decimal(
            session.total_details.amount_discount,
          ),
        },
      });

      this.update_employer_credit_balance(
        store.employer_profile_id,
        store.product_credit_value,
      );
    } else if (session.metadata.account_type === AccountEnum.EMPLOYEE) {
      console.log('Employee');
    }
  }
  async update_employer_credit_balance(
    employer_profile_id: string,
    product_credit_value: number,
  ) {
    //Update user's balance in database
    await this.prismaService.employer_Credit.update({
      where: {
        employer_profile_id: employer_profile_id,
      },
      data: {
        employer_credit_balance: { increment: product_credit_value },
      },
    });
  }
}
