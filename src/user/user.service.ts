import { Injectable } from '@nestjs/common';
import { CreateUserProvider } from './providers/create-user.provider';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly createUserProvider: CreateUserProvider) {}

  create(createUserDto: CreateUserDto) {
    return this.createUserProvider.create(createUserDto);
  }
}
