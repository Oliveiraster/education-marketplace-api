import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from '../../auth/dto/create-user.dto';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async save(userDto: CreateUserDto) {
    return this.userRepository.save(userDto);
  }
}
