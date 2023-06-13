import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/registerUser.dto';
import { Response, Request } from 'express';
import { User } from './model/user.entity';

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
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(email, password, response);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('user')
  user(@Req() req: Request): Promise<User> {
    const cookie = req.cookies['jwt'];
    return this.authService.getUser(cookie);
  }
}
