import { Injectable } from '@nestjs/common';

@Injectable()
export class ShopWebService {
  getHello(): string {
    return 'Hello World!';
  }
}
