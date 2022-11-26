import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RefreshStrategy } from 'src/utils/strategy';
import { AccessStrategy } from 'src/utils/strategy';
@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, RefreshStrategy, AccessStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
