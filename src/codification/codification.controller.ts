import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { CodificationService } from './codification.service';
import { Response } from 'express';

@Controller('codification')
export class CodificationController {
  constructor(private readonly codificationService: CodificationService) {}

  @Get()
  index(@Res() res: Response): Response<any> {
    const response = this.codificationService.getAllProductInJsonFile();
    return res.status(HttpStatus.OK).json(response);
  }
}
