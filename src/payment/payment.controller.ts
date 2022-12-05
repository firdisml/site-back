import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Inject,
  RawBodyRequest,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AccessGuard } from 'src/utils/guard';
import { AccessTokenDecorator } from 'src/utils/decorator/access.decorator';
import { PaymentEmployerDto } from 'src/utils/dto/payment.employer.dto';
import { Request } from 'express';
import Stripe from 'stripe';
import { StripeDecorator } from 'src/utils/decorator';
import { STRIPE_CLIENT } from 'src/utils/option';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
  ) {}

  @Post('employer/checkout')
  @UseGuards(AccessGuard)
  async employer_checkout(
    @AccessTokenDecorator('account_type') account_type: string,
    @Body() paymentEmployerDto: PaymentEmployerDto,
  ) {
    return this.paymentService.employer_checkout(
      account_type,
      paymentEmployerDto,
    );
  }

  @Post('complete')
  async complete(
    @Req() req: RawBodyRequest<Request>,
    @StripeDecorator('stripe-signature') stripeSigniture: string,
  ) {
    try {
      const response = this.stripe.webhooks.constructEvent(
        req.rawBody,
        stripeSigniture,
        process.env.STRIPE_SIGNITURE,
      );

      if (response.type === 'checkout.session.completed') {
        const session = response.data.object;

        if (session) {
          return this.paymentService.store_transaction(session);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
