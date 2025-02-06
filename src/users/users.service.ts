import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from '../email/email.service';
import { UserInfo } from './interface/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}
  /**
   * 회원가입
   */
  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const userExist = await this.checkUserExists(email); // 유저 중복 검사
    if (userExist) {
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입할 수 없습니다.',
      );
    }

    const signupVerifyToken = uuid.v1();

    await this.saveUserUsingTransaction(
      name,
      email,
      password,
      signupVerifyToken,
    ); // 유저 DB에 저장
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

  private async checkUserExists(emailAddress: string) {
    const user = await this.usersRepository.findOne({
      where: { email: emailAddress },
    });

    return user !== undefined;
  }

  private async saveUserUsingTransaction(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    await this.dataSource.transaction(async (manager) => {
      const user = new UserEntity(); // 새로운 유저 엔티티 객체 생성
      user.id = ulid();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;

      await this.usersRepository.save(user);
    });
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
}
