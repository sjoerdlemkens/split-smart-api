import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingProvider } from './providers/hashing.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, HashingProvider],
  exports: [HashingProvider],
})
export class AuthModule {}
