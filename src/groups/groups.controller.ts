import { Body, Controller, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { CurrentUserData } from 'src/auth/interfaces/current-user-data';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async createGroup(
    @CurrentUser() currentUser: CurrentUserData,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    return this.groupsService.createGroup(currentUser.userId, createGroupDto);
  }
}
