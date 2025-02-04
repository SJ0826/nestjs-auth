import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { ApiController } from './api/api.controller';
import { EmailService } from './email/email.service';

@Module({
  imports: [UsersModule],
  controllers: [UsersController, ApiController],
  providers: [UsersService, EmailService],
})
export class AppModule {}
