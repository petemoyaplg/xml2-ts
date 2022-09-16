import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

import * as codifications from '../resources/codifications.json';
import students from '../resources/students.json';
import * as fs from 'fs';

@Controller('/index')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Res() res: Response): Response<any> {
    const codificationsReturn = this.appService.index();
    return res.status(HttpStatus.OK).json(codificationsReturn);
  }
}
