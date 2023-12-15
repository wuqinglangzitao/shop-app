/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-08-28 11:45:30
 * @LastEditors: laikt
 * @LastEditTime: 2023-08-28 18:07:57
 */
import { NestFactory } from '@nestjs/core';
import { ShopWebModule } from './shop-web.module';

async function bootstrap() {
  const app = await NestFactory.create(ShopWebModule);
  await app.listen(3001);
}
bootstrap();
