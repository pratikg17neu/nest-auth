import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from './model/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from './dtos/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { Response, response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { where } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: RegisterDto): Promise<User> {
    const hash = await bcrypt.hash(createUserDto.password, 12);
    const user = new User();
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = createUserDto.email;
    user.password = hash; //
    return user.save();
  }

  async login(email: string, password: string, res: Response) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        'Credentials are not valid!',
        HttpStatus.FORBIDDEN,
      );
    }

    const jwt = this.jwtService.sign({ id: user.id });

    res.cookie('jwt', jwt, { httpOnly: true });

    return {
      ...user,
    };
  }

  async getUser(cookie: any): Promise<User> {
    const data: any = await this.jwtService.decode(cookie);
    const user = await this.userRepository.findOne({
      where: {
        id: data.id,
      },
    });
    return user.toJSON();
  }
}
