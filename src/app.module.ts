import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ProxyModule } from './proxy/proxy.module';

import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize/types';

dotenv.config({ path: __dirname + '/.env' });

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: <Dialect>process.env.DB_DIALECT || <Dialect>'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
    }),
    PostModule,
    CommentModule,
    ProxyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
