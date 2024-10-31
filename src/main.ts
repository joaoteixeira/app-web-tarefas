// main.ts
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

import * as exphbs from 'express-handlebars';
import * as session from 'express-session';
import * as passport from 'passport';
import flash = require('connect-flash');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const helpers = {
    dateFormat: (date: string) => {
      const locale = new Date(date);
      return locale.toLocaleString('pt-BR');
    },
    inc: (value: string) => parseInt(value) + 1,
  };

  const viewsPath = join(__dirname, '../public/views');
  app.engine(
    '.hbs',
    exphbs({ extname: '.hbs', defaultLayout: 'main', helpers }),
  );
  app.set('views', viewsPath);
  app.set('view engine', '.hbs');

  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  await app.listen(4000);
}
bootstrap();
