import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { EmployerTransactionDto } from 'src/utils/dto';
import { EmployerUniqueTransactionDto } from 'src/utils/dto/employer.unique.transaction';
import { EmployerTransactionCountDto } from 'src/utils/dto/employer.transaction.count.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  async fetch_employer_transaction(
    employerTransactionDto: EmployerTransactionDto,
  ) {
    const transactions = await this.prismaService.employer_Transaction.findMany(
      {
        skip: employerTransactionDto.skip_content,
        take: employerTransactionDto.take_content,
        where: {
          employer_profile_id: employerTransactionDto.employer_profile_id,
        },
      },
    );

    return transactions;
  }

  async fetch_employer_transaction_count(
    employerTransactionCountDto: EmployerTransactionCountDto,
  ) {
    const transactions = await this.prismaService.employer_Transaction.count({
      where: {
        employer_profile_id: employerTransactionCountDto.employer_profile_id,
      },
    });

    return transactions;
  }

  async fetch_unique_employer_transaction(
    employerUniqueTransactionDto: EmployerUniqueTransactionDto,
  ) {
    const transaction =
      await this.prismaService.employer_Transaction.findUnique({
        where: {
          id: employerUniqueTransactionDto.transaction_id,
        },
      });

    return transaction;
  }
}
