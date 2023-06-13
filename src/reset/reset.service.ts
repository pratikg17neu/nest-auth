import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reset } from './reset.entity';
import { ResetDto } from './reset.dto';

@Injectable()
export class ResetService {
  constructor(
    @InjectModel(Reset)
    private readonly resetRepository: typeof Reset,
  ) {}

  async create(email: string) {
    const reset: Reset = new Reset();
    reset.email = email;
    reset.token = Math.random().toString(20).substring(2, 12);
    return await reset.save();
  }
}
