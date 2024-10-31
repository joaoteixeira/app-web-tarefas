import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { TarefaModule } from './modules/tarefa/tarefa.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, TarefaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
