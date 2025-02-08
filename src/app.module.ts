import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as winston from 'winston';
import * as process from 'node:process';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

@Module({
  imports: [
    UsersModule,
    EmailModule,
    /**
     * env config
     */
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      isGlobal: true, // 전역모듈로 설정
      validationSchema, // joi를 이용해 유효성검사
    }),
    /**
     * typeorm config (database)
     */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // TypeORM이 구동될 때 인식하도록 할 엔티티 클래스 경로
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true', // dev | 서비스가 실행될 때 DB가 초기화된다.
    }),
    /**
     * logging config
     */
    // WinstonModule.forRoot({
    //   transports: [
    //     new winston.transports.Console({
    //       level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
    //       format: winston.format.combine(
    //         winston.format.timestamp(),
    //         nestWinstonModuleUtilities.format.nestLike('Myapp', {
    //           prettyPrint: true,
    //         }),
    //       ),
    //     }),
    //   ],
    // }),
    AuthModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
