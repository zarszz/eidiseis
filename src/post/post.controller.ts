import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  Put,
  Delete,
} from '@nestjs/common';
import { Post as PostModel } from './post.models';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Res() response, @Body() post: PostModel) {
    const newPost = await this.postService.createPost(post);
    return response.status(HttpStatus.CREATED).json({
      newPost,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const posts = await this.postService.findAll();
    return response.status(HttpStatus.OK).json({
      posts,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const post = await this.postService.findOne(id);
    return response.status(HttpStatus.OK).json({
      post,
    });
  }

  @Put('/:id')
  async update(@Res() response, @Body() post: PostModel, @Param('id') id) {
    try {
      this.postService.update(post, id);
      return response.status(HttpStatus.OK).json({ message: 'ok' });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ message: 'error' });
    }
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    try {
      this.postService.delete(id);
      return response.status(HttpStatus.OK).json({ message: 'ok' });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ message: 'error' });
    }
  }
}
