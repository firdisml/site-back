import { Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AccessGuard } from 'src/utils/guard';
import { AccessTokenDecorator } from 'src/utils/decorator/access.decorator';
import { PaymentEmployerDto } from 'src/utils/dto/payment.employer.dto';
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('employer/checkout')
  @UseGuards(AccessGuard)
  async employer_checkout(
    @AccessTokenDecorator('user_id') user_id: string,
    paymentEmployerDto: PaymentEmployerDto,
  ) {
    return this.paymentService.employer_checkout(user_id, paymentEmployerDto);
  }
}
