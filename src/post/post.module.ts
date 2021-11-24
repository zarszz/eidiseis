import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.models';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
