import { DynamicModule, Module, Provider, Global } from '@nestjs/common';
import { Stripe } from 'stripe';
import { STRIPE_CLIENT } from '../option';

@Global()
@Module({})
export class StripeModule {
  static forRoot(apiKey: string, config: Stripe.StripeConfig): DynamicModule {
    const stripe = new Stripe(apiKey, config);

    const stripeProvdier: Provider = {
      provide: STRIPE_CLIENT,
      useValue: stripe,
    };

    return {
      module: StripeModule,
      providers: [stripeProvdier],
      exports: [stripeProvdier],
    };
  }
}
