import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reset } from './reset.entity';
import { ResetDto } from './reset.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthService } from 'src/auth/auth.service';

import * as bcrypt from 'bcrypt';
@Injectable()
export class ResetService {
  constructor(
    @InjectModel(Reset)
    private readonly resetRepository: typeof Reset,
    private readonly mailService: MailerService,
    private readonly authService: AuthService,
  ) {}

  async create(email: string) {
    const reset: Reset = new Reset();
    reset.email = email;
    reset.token = Math.random().toString(20).substring(2, 12);

    const url = `http://localhost:3000/reset/${reset.token}`;

    await this.mailService.sendMail({
      to: email,
      subject: 'Reset your password',
      html: `Click <a href=${url}> Reset Password </a>`,
    });

    return await reset.save();
  }

  async resetPassword(token: string, password: string) {
    const reset = await this.resetRepository.findOne({
      where: {
        token: token,
      },
    });

    if (!reset) {
      throw new BadRequestException('Invalid token ');
    }

    const email = reset.email;
    const user = await this.authService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await this.authService.update(user);

    return {
      message: 'Success',
    };
  }
}
