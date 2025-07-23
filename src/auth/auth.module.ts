import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth.strategy';
import { SessionSerializer } from './session.serialize';

@Module({
  imports: [UsersModule,PassportModule],
  controllers: [AuthController],
  //providers: [AuthService]
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
