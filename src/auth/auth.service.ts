import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
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
      throw new BadRequestException('User with this email already exists.');
    }
    const user = await this.userService.create(userDto);

    const userSave = await this.userService.findByEmail(user.email);
    if (!userSave) {
      throw new BadRequestException('Error creating user.');
    }
    const payload: JwtPayload = {
      sub: userSave.id,
      email: userSave.email,
      roles: [userSave.role],
    };
    return this.tokenService.generateAuthToken(payload);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || user.password !== dto.password) {
      throw new ForbiddenException('email or password not exist!');
    }
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      roles: [user.role],
    };

    return this.tokenService.generateAuthToken(payload);
  }
}
