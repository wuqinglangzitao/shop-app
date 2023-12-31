/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-09-20 14:15:40
 * @LastEditors: laikt
 * @LastEditTime: 2023-09-20 14:20:06
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
/**
 * Extract request.user property (which is written by passport).
 */
export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    let request;
    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest();
    } else if (context.getType<GqlContextType>() === 'graphql') {
      // GraphQL context defined in src/app.module.ts@graphqlModuleFactory
      request = context.getArgByIndex(2).req;
    } else if (context.getType() === 'rpc') {
      throw new Error('Not implemented');
    }

    return request?.user;
  },
);
