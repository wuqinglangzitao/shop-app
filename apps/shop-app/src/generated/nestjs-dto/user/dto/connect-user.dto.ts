import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMobilePhone, IsOptional, IsString } from 'class-validator';

export class ConnectUserDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  id?: number;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  email?: string;
  @ApiProperty({
    minLength: 3,
    maxLength: 50,
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  name?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @IsMobilePhone('zh-CN')
  phone?: string;
}
