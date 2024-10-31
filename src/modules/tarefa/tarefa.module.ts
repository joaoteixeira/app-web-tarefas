import { Module } from '@nestjs/common';
import { TarefaController } from './tarefa.controller';
import { TarefaService } from './tarefa.service';

@Module({
  imports: [],
  controllers: [TarefaController],
  providers: [TarefaService],
})
export class TarefaModule {}
