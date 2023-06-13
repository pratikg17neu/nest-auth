import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reset } from './reset.entity';

@Module({
  imports: [SequelizeModule.forFeature([Reset])],
  providers: [ResetService],
  controllers: [ResetController],
})
export class ResetModule {}
