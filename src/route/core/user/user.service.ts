import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorThrowEnum } from 'src/util/enum/error.enum';
import { comparePassword, encodePassword } from 'src/util/hash/bcrypt';
import SignUpDto from '../auth/dto/sign-up.dto';
import { CreateUserDto } from './dto/create-user.dto';
import updatePassWordDto from './dto/update-user.dto';
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

  async updatePassword(id: any, body: updatePassWordDto) {
    const checkUser = await this.userRepository.checkUserById(id);
    if(checkUser===null){
      throw new Error(ErrorThrowEnum.USER_NOT_FOUND);
    }
    const newPassWord = await encodePassword(body.newPassWord);
    const match = await comparePassword(body.oldPassWord, checkUser.password);
    if (!match) {
      throw new Error(ErrorThrowEnum.PASSWORD_NOT_MATCH);
    }
    return await this.userRepository.updatePassword(id, newPassWord);
  }

  findAll(id:any) {
    return this.userRepository.findUser(id);
  }

  findOne(id: number) {
  
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
