import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingProvider } from './providers/hashing.provider';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CreateTokensProvider } from './providers/create-tokens.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    HashingProvider,
    LocalStrategy,
    JwtStrategy,
    CreateTokensProvider,
    RefreshTokensProvider,
  ],
  exports: [HashingProvider],
})
export class AuthModule {}
