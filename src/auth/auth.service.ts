import { Injectable } from '@nestjs/common';
import { User } from './model/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from './dtos/registerUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User,
  ) {}

  async create(createUserDto: RegisterDto): Promise<User> {
    const hash = await bcrypt.hash(createUserDto.password, 12);
    const user = new User();
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = createUserDto.email;
    user.password = hash; //
    return user.save();
    // return await this.userRepository.save(user);
  }
}
