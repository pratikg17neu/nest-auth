import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { User } from './model/user.entity';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [SequelizeModule.forFeature([User])],
  providers: [AuthService],
})
export class AuthModule {}
