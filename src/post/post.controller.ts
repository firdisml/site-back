import { Controller, Post, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from 'src/utils/dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post('create')
  create_post(@Body() postDto: Partial<PostDto>) {
    return this.postService.create_post(postDto);
  }
}
