import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorThrowEnum } from 'src/util/enum/error.enum';
import { encodePassword } from 'src/util/hash/bcrypt';
import SignUpDto from '../auth/dto/sign-up.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserRepository from './user.repository';


@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: SignUpDto,):Promise<any> {
    const a = await this.userRepository.checkUser(createUserDto.email);
    if (a) {
      throw new Error(ErrorThrowEnum.EMAIL_ALREADY_EXISTS);
    }
    const password = await encodePassword(createUserDto.password);
    return await this.userRepository.create({
      ...createUserDto,
      password,
    });
    
  }

  findAll(id:any) {
    return this.userRepository.findUser(id);
  }

  findOne(id: number) {
  
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
