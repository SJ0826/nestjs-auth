import {
  Controller,
  Get,
  Post,
  Headers,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Inject,
  InternalServerErrorException,
  LoggerService,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './interface/user.interface';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth.guard';
import { Logger as WinstonLogger } from 'winston';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {} // userService 컨트롤러에 주입

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    // this.printWinstonLog(dto);
    this.printLoggerServiceLog(dto);

    const { name, email, password } = dto;

    await this.usersService.createUser({ name, email, password });
  }

  // private printWinstonLog(dto) {
  //   // console.log(this.logger.name);
  //
  //   this.logger.error('error: ', dto);
  //   this.logger.warn('warn: ', dto);
  //   this.logger.info('info: ', dto);
  //   this.logger.http('http: ', dto);
  //   this.logger.verbose('verbose: ', dto);
  //   this.logger.debug('debug: ', dto);
  //   this.logger.silly('silly: ', dto);
  // }

  private printLoggerServiceLog(dto: any) {
    try {
      throw new InternalServerErrorException('test');
    } catch (e) {
      this.logger?.error('error: ' + JSON.stringify(dto), e.stack);
    }
    this.logger?.warn('warn: ' + JSON.stringify(dto));
    this.logger?.log('log: ' + JSON.stringify(dto));
    this.logger?.verbose!('verbose: ' + JSON.stringify(dto));
    this.logger?.debug!('debug: ' + JSON.stringify(dto));
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
