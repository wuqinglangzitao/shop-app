/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-08-28 11:45:30
 * @LastEditors: laikt
 * @LastEditTime: 2023-09-22 18:08:07
 */
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getHello(): string {
    // const aaa = async () => {
    //   const a = await this.cacheManager.get('aaa');
    //   console.log('cacheManager', a);
    // };
    // aaa();
    throw new Error('Method not implemented.');
    return 'Hello World!';
  }
}
