import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingProvider } from './providers/hashing.provider';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [AuthService, HashingProvider, LocalStrategy, JwtStrategy],
  exports: [HashingProvider],
})
export class AuthModule {}
