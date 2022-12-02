import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentEmployerDto {
  @IsNotEmpty()
  @IsString()
  product_api: string;

  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsString()
  product_credit_value: number;
}
