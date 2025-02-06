import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([UserEntity])], // UserEntity에 대한 저장소를 사용할 수 있게 설정
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
