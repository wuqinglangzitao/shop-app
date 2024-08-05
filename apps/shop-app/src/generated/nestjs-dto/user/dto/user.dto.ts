import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    minLength: 3,
    maxLength: 50,
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
  })
  phone: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  password: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  salt: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
}
