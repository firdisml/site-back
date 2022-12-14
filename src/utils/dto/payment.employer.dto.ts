import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class PaymentEmployerDto {
  @IsNotEmpty()
  @IsString()
  employer_profile_id: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  user_email: string;

  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsString()
  product_name: string;

  @IsNotEmpty()
  @IsString()
  product_api: string;

  @IsNotEmpty()
  @IsString()
  product_price: number;

  @IsNotEmpty()
  @IsString()
  product_credit_value: number;
}
