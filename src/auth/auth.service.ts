import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { SignUpDto } from 'src/utils/dto';
import { SignInDto } from 'src/utils/dto/signin.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from 'src/utils/type';
import { AccountEnum } from 'src/utils/enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    //DTO
    const { email, password, account } = signUpDto;

    //Check existing user
    const check = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    //Throw exception if email existed
    if (check) {
      throw new ForbiddenException('Access denied!');
    }

    //Hash password
    const hash = await this.hashData(password);

    //Insert new user
    const user = await this.prismaService.user.create({
      data: {
        email: email,
        password: hash,
        account_type: account,
      },
    });

    //Generate refresh & access token
    const tokens = await this.generate(user.id);

    //Update user refresh token
    await this.replace(user.id, tokens.refresh_token);

    //return token
    return tokens;
  }

  async signin_employee(signInDto: SignInDto) {
    //DTO
    const { email, password } = signInDto;

    //Check if user is employee
    const check: any = await this.prismaService.user.findMany({
      where: {
        AND: [{ email: email }, { account_type: AccountEnum.EMPLOYEE }],
      },
    });

    //Throw exception if email not existed
    //Throw error if user is not employee
    if (check.length !== 1) {
      throw new ForbiddenException('Access Denied');
    }

    //Compare password with argon2
    const password_check = await argon2.verify(check[0].password, password);

    //Throw error if password not same
    if (!password_check) {
      throw new ForbiddenException('Access Denied');
    }

    //Generate refresh & access token
    const tokens = await this.generate(check[0].id);

    //Update user refresh token
    await this.replace(check[0].id, tokens.refresh_token);

    //return token
    return tokens;
  }

  async signin_employer(signInDto: SignInDto) {
    //DTO
    const { email, password } = signInDto;

    //Check if user is employer
    const check: any = await this.prismaService.user.findMany({
      where: {
        AND: [{ email: email }, { account_type: AccountEnum.EMPLOYER }],
      },
    });

    //Throw exception if email not existed
    //Throw error if user is not employer
    if (check.length !== 1) {
      throw new ForbiddenException('Access Denied');
    }

    //Compare password with argon2
    const password_check = await argon2.verify(check[0].password, password);

    //Throw error if password not same
    if (!password_check) {
      throw new ForbiddenException('Access Denied');
    }

    //Generate refresh & access token
    const tokens = await this.generate(check[0].id);

    //Update user refresh token
    await this.replace(check[0].id, tokens.refresh_token);

    //return token
    return tokens;
  }

  async logout(user_id: string) {
    //Clear refresh_token field in user's database
    await this.prismaService.user.updateMany({
      where: {
        id: user_id,
        refresh_token: {
          not: null,
        },
      },
      data: {
        refresh_token: null,
      },
    });
  }

  async refreshTokens(
    user_id: string,
    refresh_token: string,
  ): Promise<TokenType> {
    //Check if user is exist
    const user = await this.prismaService.user.findUnique({
      where: {
        id: user_id,
      },
    });

    //Throw error if user or refresh token does not exist
    if (!user || !user.refresh_token) {
      throw new ForbiddenException('Access Denied!');
    }

    //Compare hashed refresh token from database with the one provided
    const check = await argon2.verify(user.refresh_token, refresh_token);

    //Throw error if refresh token is not same
    if (!check) {
      throw new ForbiddenException('Access Denied!');
    }

    //Issue new access token and refresh token
    const tokens = await this.generate(user.id);

    //Update the token in user database
    await this.replace(user.id, tokens.refresh_token);

    return tokens;
  }

  /*  This is a helper function section  */
  /*  This is a helper function section  */
  /*  This is a helper function section  */
  /*  This is a helper function section  */

  async generate(user_id: string): Promise<TokenType> {
    //Sign user' JWT access and refresh token
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          user_id,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: '1h',
        },
      ),
      this.jwtService.signAsync(
        {
          user_id,
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }

  async replace(user_id: string, refresh_token: string) {
    //Hash refresh token with argon2
    const hash = await this.hashData(refresh_token);

    //Update user's refresh token in database
    await this.prismaService.user.update({
      where: {
        id: user_id,
      },
      data: {
        refresh_token: hash,
      },
    });
  }

  hashData(data: string) {
    //Hash data using argon
    return argon2.hash(data);
  }
}
