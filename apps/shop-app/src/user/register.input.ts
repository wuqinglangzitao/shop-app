/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-09-26 18:04:56
 * @LastEditors: laikt
 * @LastEditTime: 2023-09-26 18:06:52
 */
import { UserCreateInput } from '../@generated/prisma-nestjs-graphql/user';
import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';

@InputType()
export class RegisterInput extends UserCreateInput {
  @Field(() => String, { nullable: false })
  @Validator.IsNotEmpty()
  confirmPassword!: string;
}
