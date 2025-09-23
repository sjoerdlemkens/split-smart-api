import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AddFriendDto } from './dto/add-friend.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CurrentUserData } from '../auth/interfaces/current-user-data';

@Controller('friends')
@UseGuards(JwtAuthGuard)
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  async addFriend(
    @CurrentUser() currentUser: CurrentUserData,
    @Body() addFriendDto: AddFriendDto,
  ) {
    return await this.friendsService.addFriend(
      currentUser.userId,
      addFriendDto,
    );
  }

  @Get()
  async getFriends(@CurrentUser() currentUser: CurrentUserData) {
    return await this.friendsService.getFriends(currentUser.userId);
  }
}
