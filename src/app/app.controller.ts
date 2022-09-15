import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { AppService } from './app.service';

import codifications from '../resources/codifications.json';
import students from '../resources/students.json';

@Controller('/index')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Res() res: Response): any {
    res.status(HttpStatus.OK).json(MOCKED_RESPONSE);
    return this.appService.index();
  }
}
