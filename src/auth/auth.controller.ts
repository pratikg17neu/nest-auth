import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/registerUser.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() createUser: RegisterDto) {
    return this.authService.create(createUser);
  }
}
