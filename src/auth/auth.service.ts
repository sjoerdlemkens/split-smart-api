/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { HashingProvider } from './providers/hashing.provider';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingProvider: HashingProvider,

    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    const passwordMatches = await this.hashingProvider.comparePassword(
      pass,
      user.password,
    );

    if (!passwordMatches) return null;

    const { password, ...userData } = user;
    return userData;
  }
}
