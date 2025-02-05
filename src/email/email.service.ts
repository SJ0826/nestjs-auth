import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { EmailOptions } from './interface/email-options.interface';
import emailConfig from '../config/emailConfig';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
  ) {
    this.transporter = nodemailer.createTransport({
      // nodemailer에서 제공하는 Transporter 객체 생성
      service: config.service,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = this.config.baseUrl;
    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`; // 유저가 누르는 버튼 링크

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      // 메일 본문. form 태그를 이용해 POST 요청
      html: `<form action="${url}" method="POST"><button>가입확인</button></form>`,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
