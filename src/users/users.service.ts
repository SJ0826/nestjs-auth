import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from '../email/email.service';
import { UserInfo } from './interface/user.interface';

@Injectable()
export class UsersService {
  constructor(private emailService: EmailService) {}
  /**
   * 회원가입
   */
  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    // await this.checkUserExists(email); // 유저 중복 검사

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken); // 유저 DB에 저장
    await this.sendMemberJoinEmail(email, signupVerifyToken); // 회원가입 이메일 발송
  }

  /**
   * 이메일 인증
   */
  async verifyEmail(signupVerifyToken: string) {
    // TODO
    // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    // 2. 바로 로그인 상태가 되도록 JWT를 발급

    throw new Error('Method not implemented');
  }

  /**
   * 로그인
   */
  async login(email: string, password: string) {
    // TODO
    // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. JWT를 발급

    throw new Error('Method not implemented');
  }

  /**
   * 유저 정보 조회
   */
  async getUserInfo(userId: string): Promise<UserInfo> {
    // TODO
    // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. 조회된 데이터를 UserInfo 타입으로 응답

    throw new Error('Method not implemented');
  }

  /**
   * 회원 탈퇴
   */
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private checkUserExists(email: string) {
    return true;
  }

  private saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return;
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
}
