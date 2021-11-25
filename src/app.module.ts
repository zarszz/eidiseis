import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ProxyModule } from './proxy/proxy.module';

import { Dialect } from 'sequelize/types';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: <Dialect>process.env.DB_DIALECT || <Dialect>'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
      ssl: process.env.NODE_ENV === 'production',
    }),
    PostModule,
    CommentModule,
    ProxyModule,
  ],
})
export class AppModule {}
