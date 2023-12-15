import { Controller, Get } from '@nestjs/common';
import { ShopWebService } from './shop-web.service';

@Controller()
export class ShopWebController {
  constructor(private readonly shopWebService: ShopWebService) {}

  @Get()
  getHello(): string {
    return this.shopWebService.getHello();
  }
}
