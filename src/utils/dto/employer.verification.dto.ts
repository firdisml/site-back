import { IsNotEmpty, IsString } from 'class-validator';

export class EmployerVerificationDto {
  @IsNotEmpty()
  @IsString()
  employer_name: string;

  @IsNotEmpty()
  @IsString()
  employer_size: string;

  @IsNotEmpty()
  @IsString()
  employer_industry: string;

  @IsNotEmpty()
  @IsString()
  employer_register_number: string;

  @IsNotEmpty()
  @IsString()
  employer_type: string;

  @IsNotEmpty()
  @IsString()
  employer_website: string;

  @IsNotEmpty()
  @IsString()
  employer_address: string;

  @IsNotEmpty()
  @IsString()
  employer_postal: string;

  @IsNotEmpty()
  @IsString()
  employer_city: string;

  @IsNotEmpty()
  @IsString()
  employer_state: string;

  @IsNotEmpty()
  @IsString()
  employer_country: string;
}
