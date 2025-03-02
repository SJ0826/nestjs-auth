import { Logger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([UserEntity]), AuthModule], // UserEntity에 대한 저장소를 사용할 수 있게 설정
  controllers: [UsersController],
  providers: [UsersService, Logger],
})
export class UsersModule {}
