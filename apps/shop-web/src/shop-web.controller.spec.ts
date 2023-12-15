import { Test, TestingModule } from '@nestjs/testing';
import { ShopWebController } from './shop-web.controller';
import { ShopWebService } from './shop-web.service';

describe('ShopWebController', () => {
  let shopWebController: ShopWebController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShopWebController],
      providers: [ShopWebService],
    }).compile();

    shopWebController = app.get<ShopWebController>(ShopWebController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(shopWebController.getHello()).toBe('Hello World!');
    });
  });
});
