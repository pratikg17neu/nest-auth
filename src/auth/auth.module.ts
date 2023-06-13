import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { User } from './model/user.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'secretsecret',
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {
  constructor(private configService: ConfigService) {}
}
