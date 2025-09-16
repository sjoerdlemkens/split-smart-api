import { Injectable } from '@nestjs/common';
import { CreateUserProvider } from './providers/create-user.provider';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneByEmailProvider } from 'src/user/providers/find-one-by-email.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly findOneByEmailProvider: FindOneByEmailProvider,
    private readonly createUserProvider: CreateUserProvider,
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.createUserProvider.create(createUserDto);
  }

  public async findOneByEmail(email: string) {
    return this.findOneByEmailProvider.findByEmail(email);
  }

  public async findOneById(id: number) {
    return this.userRepository.findOneBy({
      id: id
    });
  }
}
