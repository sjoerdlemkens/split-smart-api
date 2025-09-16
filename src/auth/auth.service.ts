import { Injectable } from '@nestjs/common';
import { HashingProvider } from './providers/hashing.provider';
import { UserService } from 'src/user/user.service';
import { AuthTokens } from './interfaces/auth-tokens';
import { CreateTokensProvider } from './providers/create-tokens.provider';
import { CurrentUserData } from './interfaces/current-user-data';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingProvider: HashingProvider,
    private readonly userService: UserService,
    private readonly createTokensProvider: CreateTokensProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) { }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<CurrentUserData | null> {
    const user = await this.userService.findOneByEmail(email);
    const passwordMatches = await this.hashingProvider.comparePassword(
      pass,
      user.password,
    );

    if (!passwordMatches) return null;

    return { userId: user.id, email: user.email };
  }

  login(user: CurrentUserData): AuthTokens {
    return this.createTokensProvider.createTokens(user);
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    return this.refreshTokensProvider.refreshTokens(refreshToken);
  }
}
