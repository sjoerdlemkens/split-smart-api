import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthTokens } from '../interfaces/auth-tokens';
import { CurrentUserData } from '../interfaces/current-user-data';
import { CreateTokensProvider } from './create-tokens.provider';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TokenPayload } from '../interfaces/token-payload';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly createTokensProvider: CreateTokensProvider,
  ) {}

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    const user = await this.validateRefreshToken(refreshToken);

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.createTokensProvider.createTokens(user);
  }

  async validateRefreshToken(
    refreshToken: string,
  ): Promise<CurrentUserData | null> {
    try {
      // Verify and decode the refresh token
      const decoded: TokenPayload = this.jwtService.verify(refreshToken);

      // Ensure user still exists in the database
      const user = await this.userService.findOneByEmail(decoded.email);

      if (!user) {
        return null;
      }

      return { id: user.id, email: user.email };
    } catch {
      return null;
    }
  }
}
