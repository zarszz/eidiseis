import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Comment } from './comment.models';
import { CommentService } from './comment.service';

@Controller('posts/:postId')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/comments')
  async create(
    @Res() response,
    @Param('postId') postId,
    @Body() comment: Comment,
  ) {
    comment.postId = postId;
    const newComment = await this.commentService.createComment(comment);
    return response.status(HttpStatus.CREATED).json({
      newComment,
    });
  }

  @Get('/comments')
  async fetchByPostId(@Res() response, @Param('postId') postId) {
    const posts = await this.commentService.findByPost(postId);
    return response.status(HttpStatus.OK).json({ posts });
  }

  @Get()
  async fetchAll(@Res() response) {
    const comments = await this.commentService.findAll();
    return response.status(HttpStatus.OK).json({
      comments,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const comment = await this.commentService.findOne(id);
    return response.status(HttpStatus.OK).json({
      comment,
    });
  }
}
