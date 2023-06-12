import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/registerUser.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() createUser: RegisterDto) {
    return this.authService.create(createUser);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }
}
