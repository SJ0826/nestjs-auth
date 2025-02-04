import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { ApiController } from './api/api.controller';

@Module({
  imports: [UsersModule],
  controllers: [ UsersController, ApiController],
  providers: [ UsersService],
})
export class AppModule {}
