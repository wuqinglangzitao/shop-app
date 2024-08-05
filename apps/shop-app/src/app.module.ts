/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-08-28 11:45:30
 * @LastEditors: laikt
 * @LastEditTime: 2024-08-05 18:10:21
 */
import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import {
  CacheConfigService,
  HttpConfigService,
  MulterConfigService,
} from '@app/config';
import { HttpModule } from '@nestjs/axios';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { AuthModule } from '@app/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: `./config/.env.${process.env.NODE_ENV}`,
    }),
    CacheModule.registerAsync<any>({
      useClass: CacheConfigService,
    }),
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
