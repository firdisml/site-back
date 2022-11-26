import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { AccountEnum } from '../enum';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(AccountEnum)
  readonly account: AccountEnum;
}
