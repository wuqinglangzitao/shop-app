/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-08-29 18:09:17
 * @LastEditors: laikt
 * @LastEditTime: 2023-09-19 14:54:49
 */
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from 'apps/shop-app/src/user/user.service';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().res.req;
    const headers = req.headers;
    if (!headers.authorization) throw new UnauthorizedException();
    const token = headers.authorization.split(' ')[1];
    try {
      if (!token) {
        throw new UnauthorizedException();
      }
      const user = await this.userService.verify(token);
      if (user) {
        req.user = user;
        return true;
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      return false;
    }
  }
}
