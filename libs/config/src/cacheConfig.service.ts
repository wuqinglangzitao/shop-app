/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-09-07 15:31:58
 * @LastEditors: laikt
 * @LastEditTime: 2023-09-08 23:35:46
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { CacheOptionsFactory } from '@nestjs/cache-manager';
@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  // 注入config service取得env变量
  constructor(private readonly configService: ConfigService) {} // 就是回传TypeOrmOptions对象
  async createCacheOptions() {
    const store = await redisStore({
      socket: {
        // tls: true,
        host: this.configService.get('REDIS_HOST') || 'localhost',
        port: Number(this.configService.get('REDIS_PORT')) || 6379,
      },
      database: this.configService.get('REDIS_DB'),
      password: this.configService.get('REDIS_PASSWORD'),
    });
    return {
      store,
    };
  }
}
