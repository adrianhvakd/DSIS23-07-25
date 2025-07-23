import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { partials } from 'handlebars';
import * as hbs from 'express-handlebars';
import * as session from 'express-session';
//import passport from 'passport';
import * as passport from 'passport';
import flash = require('connect-flash');
//var hbs =require('express-handlebars');
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine('hbs',hbs({
    extname:'hbs',
    partialsDir:join(__dirname, '..', 'views/partials')
  }))
  app.setViewEngine('hbs');
  app.useGlobalPipes(
  new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
