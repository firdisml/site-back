import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { EmployerTransactionDto } from 'src/utils/dto';
import { EmployerUniqueTransactionDto } from 'src/utils/dto/employer.unique.transaction';
import { EmployerTransactionCountDto } from 'src/utils/dto/employer.transaction.count.dto';
import { AccessGuard } from 'src/utils/guard';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('employer/transaction')
  @UseGuards(AccessGuard)
  fetch_employer_transaction(
    @Body() employerTransactionDto: EmployerTransactionDto,
  ) {
    return this.transactionService.fetch_employer_transaction(
      employerTransactionDto,
    );
  }

  @Post('employer/transaction/count')
  @UseGuards(AccessGuard)
  fetch_employer_transaction_count(
    @Body() employerTransactionCountDto: EmployerTransactionCountDto,
  ) {
    return this.transactionService.fetch_employer_transaction_count(
      employerTransactionCountDto,
    );
  }

  @Get('employer/transaction/:session_id')
  @UseGuards(AccessGuard)
  fetch_unique_employer_transaction(
    @Param()
    employerUniqueTransactionDto: EmployerUniqueTransactionDto,
  ) {
    return this.transactionService.fetch_unique_employer_transaction(
      employerUniqueTransactionDto,
    );
  }
}
