/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-08-28 11:45:30
 * @LastEditors: laikt
 * @LastEditTime: 2023-09-26 17:09:54
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@app/common';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // @UseGuards(AuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
