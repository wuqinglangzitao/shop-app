import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../role/entities/role.entity';

export class Permission {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  roleId: number | null;
  @ApiProperty({
    type: () => Role,
    required: false,
    nullable: true,
  })
  roles?: Role | null;
}
