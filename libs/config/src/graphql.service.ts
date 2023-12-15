/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-09-11 14:17:04
 * @LastEditors: laikt
 * @LastEditTime: 2023-09-22 11:08:52
 */
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  constructor() {}
  createGqlOptions(): ApolloDriverConfig {
    return {
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'apps/shop-app/src/schema.gql'),
      sortSchema: true,
    };
  }
}
