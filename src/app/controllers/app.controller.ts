import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { delay, of } from 'rxjs';

@Controller('')
export class AppController {
  @Get('/health-check')
  async getApp(): Promise<string> {
    return 'OK';
  }

  @MessagePattern({ cmd: 'ping' })
  ping() {
    return of('pong').pipe(delay(1000));
  }
}
