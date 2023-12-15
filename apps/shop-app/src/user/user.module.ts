/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-09-15 15:09:46
 * @LastEditors: laikt
 * @LastEditTime: 2023-09-22 10:40:47
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '@app/config/prisma.service';
import { AuthService } from '@app/common/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [],
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    AuthService,
    JwtService,
  ],
  exports: [UserService, UserResolver],
})
export class UserModule {}
