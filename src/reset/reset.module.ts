import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reset } from './reset.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/model/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Reset, User]),
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
      },
      defaults: {
        from: 'noreply@localhost.com',
      },
    }),
    AuthModule,
  ],
  providers: [ResetService],
  controllers: [ResetController],
})
export class ResetModule {}
