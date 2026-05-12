import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { About } from './entities/about.entity';
import { User } from './entities/user.entity';
import { AboutRepository } from './repository/aboutRepository';
import { UserRepository } from './repository/userRepository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, About])],
  controllers: [UserController],
  providers: [UserService, UserRepository, AboutRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
