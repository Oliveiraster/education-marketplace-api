import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../../../../auth/dto/create-user.dto';
import { PersonalUpdateDto } from '../../profile/dto/updates/personal-update.dto';
import { User } from '../entities/user.entity';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findMyProfile(id: number) {
    const profile = await this.userRepository.findOne({
      where: { id },
      relations: {
        about: true,
        addresses: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        whatsapp: true,
        photo: true,
        about: {
          id: true,
          bio: true,
          skills: true,
          role: true,
          objective: true,
        },
        addresses: {
          id: true,
          city: true,
          state: true,
        },
      },
    });
    if (!profile) {
      throw new NotFoundException('User not found');
    }
    return profile;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async save(userDto: CreateUserDto) {
    return this.userRepository.save(userDto);
  }

  async updatePersonal(user: User, dto: PersonalUpdateDto) {
    this.userRepository.merge(user, dto);

    return this.userRepository.save(user);
  }

  async updatePhoto(user: User, photoUrl: string) {
    user.photo = photoUrl;

    return this.userRepository.save(user);
  }
}
