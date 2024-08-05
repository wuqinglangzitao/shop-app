/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-09-26 18:04:56
 * @LastEditors: laikt
 * @LastEditTime: 2024-08-05 16:14:19
 */

import * as Validator from 'class-validator';
import { CreateUserDto } from '../generated/nestjs-dto';

export class RegisterDTO extends CreateUserDto {
  @Validator.IsNotEmpty()
  confirmPassword: string;
}
