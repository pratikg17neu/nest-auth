import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import { ResetService } from './reset.service';

@Controller()
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Post('forgot')
  async forgot(@Body('email') email: string) {
    await this.resetService.create(email);
    return {
      message: 'Success! Check your email',
    };
  }

  @Post('reset')
  async reset(
    @Body('token') token: string,
    @Body('password') password: string,
    @Body('confirm_password') confirm_password: string,
  ) {
    if (password !== confirm_password) {
      throw new BadRequestException('Password does not match!');
    }

    return this.resetService.resetPassword(token, password);
  }
}
