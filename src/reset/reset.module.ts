import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reset } from './reset.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    SequelizeModule.forFeature([Reset]),
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
      },
      defaults: {
        from: 'noreply@localhost.com',
      },
    }),
  ],
  providers: [ResetService],
  controllers: [ResetController],
})
export class ResetModule {}
