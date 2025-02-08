import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import authConfig from '../config/authConfig';

@Module({
  imports: [ConfigModule.forFeature(authConfig)],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
