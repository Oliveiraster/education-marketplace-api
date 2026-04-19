import { Injectable } from '@nestjs/common';

import { UserRepository } from './userRepository';
import { CreateUserDto } from '../../../auth/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async create(userDto: CreateUserDto) {
    return this.userRepository.save(userDto);
  }
}
