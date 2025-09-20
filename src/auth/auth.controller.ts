/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthTokens } from './interfaces/auth-tokens';
import { CurrentUserData } from './interfaces/current-user-data';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: Request): AuthTokens {
    const user = req['user'] as CurrentUserData;
    return this.authService.login(user);
  }

  @Public()
  @Post('refresh')
  public async refreshTokens(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<AuthTokens> {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<AuthTokens> {
    return this.authService.register(createUserDto);
  }
}
