/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2024-08-05 14:19:52
 * @LastEditors: laikt
 * @LastEditTime: 2024-08-05 15:27:17
 */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDTO {
  @ApiProperty({ description: '手机号', example: 'js' })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly phone: string;
  @ApiProperty({ description: '密码', example: '123' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}
