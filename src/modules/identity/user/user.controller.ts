import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';

import { UserService } from './user.service';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserType } from '../../../auth/enum/userType.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('teste')
  @Roles(UserType.USER)
  async testeFunction() {
    return 'rota segura';
  }
}
