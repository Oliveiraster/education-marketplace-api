import { Injectable, NotFoundException } from '@nestjs/common';

import { AboutRepository } from './repository/aboutRepository';
import { UserRepository } from './repository/userRepository';
import { CreateUserDto } from '../../../auth/dto/create-user.dto';
import { AboutUpdateDto } from '../profile/dto/updates/about-update.dto';
import { PersonalUpdateDto } from '../profile/dto/updates/personal-update.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly aboutRepository: AboutRepository,
  ) {}

  async getMyProfile(id: number) {
    return this.userRepository.findMyProfile(id);
  }
  async getUser(id: number) {
    return this.userRepository.findById(id);
  }
  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async create(userDto: CreateUserDto) {
    return this.userRepository.save(userDto);
  }

  async updateAbout(id: number, dto: AboutUpdateDto) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.aboutRepository.upsertAbout(user, dto);
  }
  async updatePersonal(id: number, dto: PersonalUpdateDto) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.updatePersonal(user, dto);
  }

  async updatePhoto(id: number, photoUrl: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.updatePhoto(user, photoUrl);
  }
}
