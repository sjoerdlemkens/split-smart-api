import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CurrentUserData } from 'src/auth/interfaces/current-user-data';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('logged-in')
  @UseGuards(JwtAuthGuard)
  getLoggedInUser(@CurrentUser() currentUser: CurrentUserData) {
    return this.userService.findOneById(currentUser.userId);
  }
}
