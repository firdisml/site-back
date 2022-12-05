import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EmployerTransactionDto {
  @IsNotEmpty()
  @IsString()
  employer_profile_id: string;

  @IsNotEmpty()
  @IsNumber()
  skip_content: number;

  @IsNotEmpty()
  @IsNumber()
  take_content: number;
}
