import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CurrentUserData } from 'src/auth/interfaces/current-user-data';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('logged-in')
  @UseGuards(JwtAuthGuard)
  getLoggedInUser(@CurrentUser() currentUser: CurrentUserData) {
    return this.userService.findOneById(currentUser.userId);
  }
}
