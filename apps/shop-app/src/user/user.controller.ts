/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2024-08-04 10:58:31
 * @LastEditors: laikt
 * @LastEditTime: 2024-08-11 14:02:31
 */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '@app/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { User } from '../generated/nestjs-dto';
import { CreateUserDto } from '../generated/nestjs-dto';
import { RegisterDTO } from './register.dto';
import { LoginDTO } from './login.dto';
import { Public, CurrentUser } from '@app/common/decorator';
@ApiBearerAuth() // Swagger 的 JWT 验证
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}
  @Get('find-all')
  @ApiBody({
    description: '获取所有用户',
    type: CreateUserDto,
  })
  findAll() {
    return this.usersService.findAll();
  }
  // @Public()
  @Post('find-one')
  findOne(@Body() body: any, @CurrentUser() user) {
    console.log('user', user);
    return this.usersService.findOne(body.id);
  }
  // JWT验证 - Step 1: 用户请求登录
  //  @UseGuards(AuthGuard('local')) // 使用 'JWT' 进行验证
  @ApiBody({
    description: '用户登录',
    type: LoginDTO,
  })
  @Public()
  @Post('login')
  async login(@Body() loginParmas: LoginDTO) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParmas.phone,
      loginParmas.password,
    );
    if (authResult) {
      return this.authService.certificate(authResult);
    } else {
      return {
        code: 600,
        msg: `账号或密码不正确`,
      };
    }
  }
  @Public()
  @Post('register')
  @ApiBody({
    description: '用户注册',
    type: RegisterDTO,
  })
  async register(@Body() body: RegisterDTO) {
    return await this.usersService.register(body);
  }
  @Post()
  create(@Body() registerInfoDTO: RegisterDTO): Promise<User> {
    return this.usersService.create(registerInfoDTO);
  }
}
