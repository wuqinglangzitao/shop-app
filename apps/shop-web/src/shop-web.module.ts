import { Module } from '@nestjs/common';
import { ShopWebController } from './shop-web.controller';
import { ShopWebService } from './shop-web.service';

@Module({
  imports: [],
  controllers: [ShopWebController],
  providers: [ShopWebService],
})
export class ShopWebModule {}
