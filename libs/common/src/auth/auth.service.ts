/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-09-19 17:22:52
 * @LastEditors: laikt
 * @LastEditTime: 2023-09-28 11:16:58
 */
// src/logical/auth/auth.service.ts
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserService } from 'apps/shop-app/src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../utils/cryptogram';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(phone: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByName(phone);
    if (user) {
      const hashedPassword = user.password;
      const salt = user.salt;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        // 密码正确
        return user;
      } else {
        // 密码错误
        return null;
      }
    }
    // 查无此人
    return null;
  }
  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user) {
    const payload = {
      name: user.name,
      id: user.id,
      phone: user.phone,
      roles: user.roles,
      email: user.email,
    };
    try {
      const token = this.jwtService.sign(payload);
      return token;
    } catch (error) {
      return null;
    }
  }

  login(phone: string, password: string) {
    const user = this.validateUser(phone, password);
    if (user) {
      return this.certificate(user);
    }
    return null;
  }
}
