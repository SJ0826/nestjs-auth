import {
  Controller,
  Get,
  Post,
  Headers,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './interface/user.interface';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {} // userService 컨트롤러에 주입

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    const { name, email, password } = createUserDto;
    await this.usersService.createUser({ name, email, password });
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto) {
    const { signupVerifyToken } = dto;
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() loginDto: UserLoginDto) {
    const { email, password } = loginDto;
    return await this.usersService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUserInfo(
    @Headers() headers: any,
    @Param('id') userId: string,
  ): Promise<UserInfo> {
    // const jwtString = headers.authorization.split('Bearer ')[1];
    //
    // this.authService.verify(jwtString); // JWT가 서버에서 발급한 것인지 검증
    return await this.usersService.getUserInfo(userId);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
