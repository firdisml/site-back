import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async fetch_user(user_id: string) {
    const user = this.prismaService.user.findUnique({
      where: {
        id: user_id,
      },
      include: {
        employer_profile: {
          include: {
            employer_address: true,
          },
        },
      },
    });

    return user;
  }
}
