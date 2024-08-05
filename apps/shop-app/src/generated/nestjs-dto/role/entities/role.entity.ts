import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '../../permission/entities/permission.entity';
import { User } from '../../user/entities/user.entity';

export class Role {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: () => Permission,
    isArray: true,
    required: false,
  })
  permissions?: Permission[];
  @ApiProperty({
    type: () => User,
    required: false,
    nullable: true,
  })
  role?: User | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  userId: number | null;
}
