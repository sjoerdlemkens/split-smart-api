import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  async createGroup(userId: string, createGroupDto: CreateGroupDto) {
    const group = this.groupsRepository.create({
      ...createGroupDto,
      ownerId: userId,
    });
    return this.groupsRepository.save(group);
  }

  async getGroups(userId: string) {
    // TODO: Also includes groups that the user is a member of
    return this.groupsRepository.find({
      where: { ownerId: userId },
    });
  }
}
