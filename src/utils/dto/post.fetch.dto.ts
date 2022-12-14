import { IsNotEmpty, IsString, IsBoolean, IsNumber } from 'class-validator';

export class PostFetchDto {
  @IsNotEmpty()
  @IsString()
  employer_profile_id: string;

  @IsBoolean()
  @IsNotEmpty()
  post_visibility: boolean;

  @IsBoolean()
  @IsNotEmpty()
  post_pending: boolean;

  @IsNotEmpty()
  @IsNumber()
  skip_content: number;

  @IsNotEmpty()
  @IsNumber()
  take_content: number;
}
