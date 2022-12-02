import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { STRIPE_CLIENT } from 'src/utils/option';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { PaymentEmployerDto } from 'src/utils/dto/payment.employer.dto';
@Injectable()
export class PaymentService {
  constructor(
    @Inject(STRIPE_CLIENT) private readonly stripe: Stripe,
    private prisma: PrismaService,
  ) {}

  async employer_checkout(
    user_id: string,
    paymentEmployerDto: PaymentEmployerDto,
  ) {
    //Create payment empployer session
    const checkout = await this.stripe.checkout.sessions.create({
      line_items: [{ price: paymentEmployerDto.product_api, quantity: 1 }],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      metadata: {
        user_id: user_id,
        credit: paymentEmployerDto.product_credit_value,
        product_id: paymentEmployerDto.product_id,
        product_api: paymentEmployerDto.product_api,
      },
    });

    return { checkout: checkout.url };
  }
}
