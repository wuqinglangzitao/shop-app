/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-09-07 15:31:58
 * @LastEditors: laikt
 * @LastEditTime: 2023-09-13 11:38:03
 */
import { Injectable } from '@nestjs/common';
import { HttpModuleOptionsFactory, HttpModuleOptions } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  // 注入config service取得env变量
  constructor(private readonly configService: ConfigService) {} // 就是回传TypeOrmOptions对象
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: Number(this.configService.get('HTTP_TIMEOUT')),
      maxRedirects: Number(this.configService.get('HTTP_MAX_REDIRECTS')),
      maxContentLength: Number(
        this.configService.get('HTTP_MAX_CONTENT_LENGTH'),
      ),
      withCredentials: JSON.parse(
        this.configService.get('HTTP_WITH_CREDENTIALS') || 'false',
      ),
      baseURL: this.configService.get('HTTP_BASEURL'),
      // changeOrigin: this.configService.getBoolean('HTTP_CHANGE_ORIGIN')
    };
  }
}
