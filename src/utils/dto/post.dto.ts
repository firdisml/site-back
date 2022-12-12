import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsDate,
  IsDecimal,
  IsInt,
  IsEmpty,
} from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  employer_profile_id: string;

  @IsDate()
  expired_at: Date;

  @IsDate()
  approved_at: Date;

  @IsDate()
  renewed_at: Date;

  @IsNotEmpty()
  @IsString()
  job_title: string;

  @IsNotEmpty()
  @IsDecimal()
  job_minimum_pay_range: number;

  @IsNotEmpty()
  @IsDecimal()
  job_maximum_pay_range: number;

  @IsNotEmpty()
  @IsString()
  job_type: string;

  @IsNotEmpty()
  @IsString()
  job_about: string;

  @IsNotEmpty()
  @IsString()
  job_experience: string;

  @IsNotEmpty()
  @IsString()
  job_arrangement: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  job_descriptions: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  job_requirements: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  job_skills: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  job_tags: string[];

  @IsNotEmpty()
  @IsString()
  job_city: string;

  @IsNotEmpty()
  @IsString()
  job_state: string;

  @IsNotEmpty()
  @IsString()
  job_post_package: string;

  @IsNotEmpty()
  @IsInt()
  job_post_credit: number;

  @IsNotEmpty()
  @IsInt()
  job_post_duration: number;
}
