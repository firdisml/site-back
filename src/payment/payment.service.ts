import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { STRIPE_CLIENT } from 'src/utils/option';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { PaymentEmployerDto } from 'src/utils/dto/payment.employer.dto';
import { AccountEnum } from 'src/utils/enum';

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
      line_items: [{ price: paymentEmployerDto.product_api, quantity: 1 }],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      metadata: {
        account_type,
        employer_profile_id: paymentEmployerDto.employer_profile_id,
        product_id: paymentEmployerDto.product_id,
        product_name: paymentEmployerDto.product_name,
        product_api: paymentEmployerDto.product_api,
        product_price: paymentEmployerDto.product_price,
        product_credit_value: paymentEmployerDto.product_credit_value,
        product_description: paymentEmployerDto.product_description,
        product_feature_1: paymentEmployerDto.product_features[0],
        product_feature_2: paymentEmployerDto.product_features[1],
        product_feature_3: paymentEmployerDto.product_features[2],
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
          stripe_id: session.payment_intent,
          product_name: session.metadata.product_name,
          product_api: session.metadata.product_api,
          product_price: session.metadata.product_price,
          product_credit_value: session.metadata.product_credit_value,
          product_description: session.metadata.product_description,
          product_feature_1: session.metadata.product_feature_1,
          product_feature_2: session.metadata.product_feature_2,
          product_feature_3: session.metadata.product_feature_3,
        },
      });

      this.update_employer_credit_balance(
        store.employer_profile_id,
        parseInt(store.product_credit_value),
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
