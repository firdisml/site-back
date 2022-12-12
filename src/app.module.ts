import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './utils/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { VerificationModule } from './verification/verification.module';
import { UserModule } from './user/user.module';
import { StripeModule } from './utils/stripe/stripe.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { redisStore } from 'cache-manager-redis-store';
import { TransactionModule } from './transaction/transaction.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: parseInt(process.env.THROTTLER_TTL),
      limit: parseInt(process.env.THROTTLER_LIMIT),
    }),
    VerificationModule,
    UserModule,
    StripeModule.forRoot(process.env.STRIPE_PRIVATE_KEY, {
      apiVersion: '2022-11-15',
    }),
    CacheModule.registerAsync<any>({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
          },
          password: process.env.REDIS_PASSWORD,
        });
        return {
          store: {
            create: () => store,
          },
        };
      },
    }),
    PaymentModule,
    ProductModule,
    TransactionModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
