import { Controller, Get } from '@nestjs/common';

/*
하위 도메인 라우팅
 */
@Controller({ host: 'api.localhost' })
export class ApiController {
  @Get()
  index() {
    return 'Hello, API!';
  }
}
