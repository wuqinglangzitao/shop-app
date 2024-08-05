/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-09-15 15:09:46
 * @LastEditors: laikt
 * @LastEditTime: 2024-08-05 14:39:01
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// import { UserResolver } from './user.resolver';
import { UserController } from './user.controller';
import { PrismaService } from '@app/config/prisma.service';
import { AuthService } from '@app/common/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [],
  providers: [
    UserController,
    UserService,
    PrismaService,
    AuthService,
    JwtService,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
