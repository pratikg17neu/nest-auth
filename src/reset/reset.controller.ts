import { Body, Controller, Post } from '@nestjs/common';
import { ResetService } from './reset.service';

@Controller()
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Post('forgot')
  async forgot(@Body('email') email: string) {
    await this.resetService.create(email);
    return {
      message: 'Success',
    };
  }
}
