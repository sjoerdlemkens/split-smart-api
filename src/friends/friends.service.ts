import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friends } from './friends.entity';
import { User } from '../user/user.entity';
import { AddFriendDto } from './dto/add-friend.dto';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friends)
    private readonly friendsRepository: Repository<Friends>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addFriend(
    userId: string,
    addFriendDto: AddFriendDto,
  ): Promise<Friends> {
    const { email } = addFriendDto;

    // Find the friend by email
    const friend = await this.userRepository.findOne({
      where: { email },
    });

    if (!friend) {
      throw new NotFoundException('User with this email not found');
    }

    // Check if trying to add self as friend
    if (friend.id === userId) {
      throw new BadRequestException('Cannot add yourself as a friend');
    }

    // Check if friendship already exists
    const existingFriendship = await this.friendsRepository.findOne({
      where: [
        { userId, friendId: friend.id },
        { userId: friend.id, friendId: userId },
      ],
    });

    if (existingFriendship) {
      throw new BadRequestException('Friendship already exists');
    }

    // Create the friendship
    const friendship = this.friendsRepository.create({
      userId,
      friendId: friend.id,
    });

    return await this.friendsRepository.save(friendship);
  }

  async getFriends(userId: string): Promise<User[]> {
    const friendships = await this.friendsRepository.find({
      where: [{ userId }, { friendId: userId }],
      relations: ['user', 'friend'],
    });

    return friendships.map((friendship) =>
      friendship.userId === userId ? friendship.friend : friendship.user,
    );
  }
}
