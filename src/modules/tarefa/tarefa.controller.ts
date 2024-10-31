// src/app.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  Res,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { TarefaService } from './tarefa.service';

@Controller('tarefas')
@UseGuards(AuthenticatedGuard)
@UseFilters(AuthExceptionFilter)
export class TarefaController {
  constructor(private readonly service: TarefaService) {}

  @Get('/')
  @Render('tarefa/index')
  index(@Request() req) {
    var tarefas = this.service.getAll();

    return { listaTarefas: tarefas };
  }

  @Get('/create')
  @Render('tarefa/formulario')
  createForm(@Request() req) {
    return {};
  }

  @Post('/save')
  async createSave(@Res() res: Response, @Body() body) {
    await this.service.create(body);

    res.redirect('/tarefas');
  }
}
