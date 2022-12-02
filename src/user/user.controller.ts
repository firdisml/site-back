import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessGuard } from 'src/utils/guard';
import { AccessTokenDecorator } from 'src/utils/decorator/access.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('fetch')
  @UseGuards(AccessGuard)
  async fetch_user(@AccessTokenDecorator('user_id') user_id: string) {
    return this.userService.fetch_user(user_id);
  }
}
