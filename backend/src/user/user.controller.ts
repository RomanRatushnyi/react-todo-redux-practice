import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

export class LoginDto {
  username: string;
  password: string;
}

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userService.validateUser(username, password);

    if (!user) {
      throw new HttpException('Неправильний логін або пароль', HttpStatus.UNAUTHORIZED);
    }

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }
}
