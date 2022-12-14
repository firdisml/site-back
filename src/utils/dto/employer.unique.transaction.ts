import { IsNotEmpty, IsString } from 'class-validator';

export class EmployerUniqueTransactionDto {
  @IsNotEmpty()
  @IsString()
  session_id: string;
}
