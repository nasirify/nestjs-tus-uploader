import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly myLovedService: AppService) {}

  @Get('whoToThank')
  method() {
    return this.myLovedService.getHello();
  }
}