import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './decorators/auth-public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/user')
  async createUser(@Body() userDto: CreateUserDto) {
    return this.authService.createUser(userDto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
