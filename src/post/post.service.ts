import { Injectable } from '@nestjs/common';
import { PostDto } from 'src/utils/dto/post.dto';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PostFetchDto } from 'src/utils/dto/post.fetch.dto';
import { PostCountDto } from 'src/utils/dto/post.count.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create_post(postDto: Partial<PostDto>) {
    const create_post = await this.prismaService.employer_Job_Post.create({
      data: {
        employer_profile_id: postDto.employer_profile_id,
        expired_at: postDto.expired_at,
        approved_at: postDto.approved_at,
        renewed_at: postDto.renewed_at,
        job_title: postDto.job_title,
        job_minimum_pay_range: new Prisma.Decimal(
          postDto.job_minimum_pay_range,
        ),
        job_maximum_pay_range: new Prisma.Decimal(
          postDto.job_maximum_pay_range,
        ),
        job_type: postDto.job_type,
        job_about: postDto.job_about,
        job_experience: postDto.job_experience,
        job_arrangement: postDto.job_arrangement,
        job_descriptions: postDto.job_descriptions,
        job_requirements: postDto.job_requirements,
        job_skills: postDto.job_skills,
        job_tags: postDto.job_tags,
        job_city: postDto.job_city,
        job_state: postDto.job_state,
        job_post_package: postDto.job_post_package,
        job_post_credit: postDto.job_post_credit,
        job_post_duration: postDto.job_post_duration,
      },
    });

    return create_post;
  }

  async fetch_post(postFetchDto: PostFetchDto) {
    const fetch_post = await this.prismaService.employer_Job_Post.findMany({
      skip: postFetchDto.skip_content,
      take: postFetchDto.take_content,
      where: {
        employer_profile_id: postFetchDto.employer_profile_id,
        post_visibility: postFetchDto.post_pending,
        post_pending: postFetchDto.post_visibility,
      },
    });

    return fetch_post;
  }

  async fetch_post_count(postCountDto: PostCountDto) {
    const transactions = await this.prismaService.employer_Job_Post.count({
      where: {
        employer_profile_id: postCountDto.employer_profile_id,
        post_visibility: postCountDto.post_pending,
        post_pending: postCountDto.post_visibility,
      },
    });

    return transactions;
  }
}
