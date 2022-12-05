import { IsNotEmpty, IsString } from 'class-validator';

export class EmployerTransactionCountDto {
  @IsNotEmpty()
  @IsString()
  employer_profile_id: string;
}
