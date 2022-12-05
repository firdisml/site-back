import { IsNotEmpty, IsString } from 'class-validator';

export class EmployerUniqueTransactionDto {
  @IsNotEmpty()
  @IsString()
  transaction_id: string;
}
