import { IsNotEmpty, IsString, IsBoolean, IsNumber } from 'class-validator';

export class PostCountDto {
  @IsNotEmpty()
  @IsString()
  employer_profile_id: string;

  @IsBoolean()
  @IsNotEmpty()
  post_visibility: boolean;

  @IsBoolean()
  @IsNotEmpty()
  post_pending: boolean;
}
