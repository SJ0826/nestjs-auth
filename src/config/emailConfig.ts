import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('email', () => ({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASSWORD,
  },
  baseUrl: process.env.EMAIL_BASE_URL,
}));

/*
registerAs: 설정 이름('email')과 설정 객체를 등록. 다론 모듈에서 ConfigService를 통해 'email' 네임스페이스로 접근할 수 있다.
 */
