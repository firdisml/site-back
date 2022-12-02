import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/utils/dto';
import { SignInDto } from 'src/utils/dto/signin.dto';
import { Response } from 'express';
import { accessTokenCookieOptions } from 'src/utils/option';
import { refreshTokenCookieOptions } from 'src/utils/option';
import { RefreshGuard } from 'src/utils/guard';
import { RefreshTokenDecorator } from 'src/utils/decorator/refresh.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.signup(signUpDto);
    response.cookie(
      'access_token',
      user.access_token,
      accessTokenCookieOptions,
    );
    if (user.refresh_token)
      response.cookie(
        'refresh_token',
        user.refresh_token,
        refreshTokenCookieOptions,
      );
  }

  @Post('signin/employee')
  async signin_employee(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.signin_employee(signInDto);
    response.cookie(
      'access_token',
      user.access_token,
      accessTokenCookieOptions,
    );
    if (user.refresh_token)
      response.cookie(
        'refresh_token',
        user.refresh_token,
        refreshTokenCookieOptions,
      );
  }

  @Post('signin/employer')
  async signin_employer(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.signin_employer(signInDto);
    response.cookie(
      'access_token',
      user.access_token,
      accessTokenCookieOptions,
    );
    if (user.refresh_token)
      response.cookie(
        'refresh_token',
        user.refresh_token,
        refreshTokenCookieOptions,
      );
  }

  @Post('logout')
  @UseGuards(RefreshGuard)
  async logout(
    @RefreshTokenDecorator('user_id') user_id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(user_id);
    response.clearCookie('access_token', accessTokenCookieOptions);
    response.clearCookie('refresh_token', refreshTokenCookieOptions);
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(
    @RefreshTokenDecorator('user_id') user_id: string,
    @RefreshTokenDecorator('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.refreshTokens(user_id, refresh_token);
    response.cookie(
      'access_token',
      user.access_token,
      accessTokenCookieOptions,
    );
    if (user.refresh_token)
      response.cookie(
        'refresh_token',
        user.refresh_token,
        refreshTokenCookieOptions,
      );
  }
}
