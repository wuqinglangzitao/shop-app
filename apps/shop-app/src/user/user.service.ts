/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-09-15 15:09:46
 * @LastEditors: laikt
 * @LastEditTime: 2023-09-27 10:07:02
 */
import { Injectable, BadRequestException } from '@nestjs/common';
import {
  UserCreateInput,
  UserUncheckedUpdateInput,
} from '../@generated/prisma-nestjs-graphql/user';
import { PrismaService } from '@app/config/prisma.service';
import { RegisterInput } from './register.input';
import { makeSalt, encryptPassword } from '@app/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserInput: UserCreateInput) {
    return this.prisma.user.create({
      data: createUserInput,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOneByName(name: string) {
    return this.prisma.user.findFirst({
      where: {
        name,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserInput: UserUncheckedUpdateInput) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserInput,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  verify(token: string) {
    return token;
  }

  findOneByInfo({ phone, email, name }) {
    return this.prisma.user.findFirst({
      where: {
        phone,
        email,
        name,
      },
    });
  }

  async register(createUserInput: RegisterInput) {
    const { password, confirmPassword, email, phone, name } = createUserInput;
    if (password !== confirmPassword) {
      throw new BadRequestException('密码不一致');
    }
    const user = await this.findOneByInfo({ email, phone, name });
    if (user) {
      throw new BadRequestException('用户已存在');
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码
    createUserInput.salt = salt;
    createUserInput.password = hashPwd;

    return this.prisma.user.create({
      data: createUserInput,
    });
  }
}
