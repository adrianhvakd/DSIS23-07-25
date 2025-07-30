import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './cliente/cliente.module';
import { ClienteEntity } from './cliente/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'vacaciones2',
      entities: [ClienteEntity],
      synchronize: true,
    }), ClienteModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
/*npm install --save @nestjs/typeorm typeorm mysql2
npm i --save class-validator class-transformer
npm install --save hbs
npm install --save express-handlebars@^5.3.0 
            @types/express-handlebars@^5.3.0
git clone https://github.com/SlimShadyIAm/material-admin
*/