import { Controller, Post, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from 'src/utils/dto/post.dto';
import { PostFetchDto } from 'src/utils/dto/post.fetch.dto';
import { PostCountDto } from 'src/utils/dto/post.count.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post('create')
  create_post(@Body() postDto: Partial<PostDto>) {
    return this.postService.create_post(postDto);
  }

  @Post('fetch')
  fetch_post(@Body() postFetchDto: PostFetchDto) {
    return this.postService.fetch_post(postFetchDto);
  }

  @Post('count')
  fetch_post_count(@Body() postCountDto: PostCountDto) {
    return this.postService.fetch_post_count(postCountDto);
  }
}
