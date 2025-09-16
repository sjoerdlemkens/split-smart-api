import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthTokens } from '../interfaces/auth-tokens';
import { CurrentUserData } from '../interfaces/current-user-data';
import { TokenPayload } from '../interfaces/token-payload';

@Injectable()
export class CreateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  createTokens(user: CurrentUserData): AuthTokens {
    const payload: TokenPayload = {
      sub: user.userId,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<number>('jwt.accessTokenTtl'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<number>('jwt.refreshTokenTtl'),
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
