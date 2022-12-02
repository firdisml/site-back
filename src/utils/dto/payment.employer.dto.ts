import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

export class PaymentEmployerDto {
  @IsNotEmpty()
  @IsString()
  product_name: string;

  @IsNotEmpty()
  @IsString()
  product_api: string;

  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsString()
  product_price: number;

  @IsNotEmpty()
  @IsString()
  product_description: string;

  @IsNotEmpty()
  @IsString()
  product_credit_value: number;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  product_features: string[];
}
