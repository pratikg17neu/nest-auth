import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reset } from './reset.entity';
import { ResetDto } from './reset.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ResetService {
  constructor(
    @InjectModel(Reset)
    private readonly resetRepository: typeof Reset,
    private readonly mailService: MailerService,
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
}
