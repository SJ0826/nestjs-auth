import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './interface/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 회원가입
   */
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    console.log(createUserDto);
  }

  /**
   * 이메일 인증
   */
  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    console.log(dto);
    return 'verify email';
  }

  /**
   * 로그인
   */
  @Post('/login')
  async login(@Body() loginDto: UserLoginDto): Promise<string> {
    console.log(loginDto);
    return 'login';
  }

  /**
   * 유저 정보 조회
   */
  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    console.log(userId);
    return { id: '', email: '', name: '' };
  }
}
