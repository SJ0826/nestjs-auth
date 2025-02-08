import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'node:fs';
import * as dotenv from 'dotenv';

// ✅ .env 파일 존재 여부 확인
const envPath = 'src/config/env/.development.env';
if (fs.existsSync(envPath)) {
  console.log(`✅ .env 파일 찾음: ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.log(`🚨 .env 파일 없음: ${envPath}`);
}

// ✅ .env 강제 로드
// dotenv.config({ path: envPath });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 모든 요청의 데이터에 ValidationPipe 전역으로 적용
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
