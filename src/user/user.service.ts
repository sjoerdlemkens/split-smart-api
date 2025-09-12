import { Injectable } from '@nestjs/common';
import { CreateUserProvider } from './providers/create-user.provider';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneByEmailProvider } from 'src/user/providers/find-one-by-email.provider';

@Injectable()
export class UserService {
  constructor(
    private readonly findOneByEmailProvider: FindOneByEmailProvider,
    private readonly createUserProvider: CreateUserProvider,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.createUserProvider.create(createUserDto);
  }
  public async findOneByEmail(email: string) {
    return this.findOneByEmailProvider.findByEmail(email);
  }
}
