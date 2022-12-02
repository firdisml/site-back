import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './utils/prisma/prisma.service';
import * as cookieParser from 'cookie-parser';
import { config } from 'aws-sdk';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  config.update({
    accessKeyId: process.env.S3_ACCESS,
    secretAccessKey: process.env.S3_SECRET,
    region: process.env.S3_REGION,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
