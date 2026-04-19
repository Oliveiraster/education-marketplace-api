import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserType } from './enum/userType.enum';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { TokenService } from './services/token.service';
import { UserService } from '../modules/identity/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async createUser(userDto: CreateUserDto) {
    if (await this.userService.findByEmail(userDto.email)) {
      throw new Error('User with this email already exists.');
    }
    const user = await this.userService.create(userDto);

    const userSave = await this.userService.findByEmail(user.email);
    if (!userSave) {
      throw new Error('Error creating user.');
    }
    const payload: JwtPayload = {
      sub: userSave.id,
      email: userSave.email,
      roles: [userSave.role] as UserType[],
    };
    return this.tokenService.generateAuthToken(payload);
  }
}
