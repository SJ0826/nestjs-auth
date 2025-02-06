import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { ValidationPipe } from '@nestjs/common';

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
