import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class TarefaService {
  getAll() {
    return this.getTarefasArquivo();
  }

  async create(tarefa: any) {
    var listaTarefas = this.getTarefasArquivo();

    listaTarefas.push({
      id: listaTarefas.length + 1,
      descricao: tarefa.descricao,
      feito: tarefa.feito || false,
      dataCriacao: new Date(),
    });

    fs.writeFileSync(
      `database/tarefas.json`,
      JSON.stringify(listaTarefas, null, 2),
    );
  }

  private getTarefasArquivo() {
    var data = fs.readFileSync('database/tarefas.json', 'utf8');

    return JSON.parse(data);
  }
}
