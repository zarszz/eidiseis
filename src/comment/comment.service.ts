import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.models';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentModel.findAll();
  }

  findOne(id: string): Promise<Comment> {
    return this.commentModel.findOne({
      where: {
        id,
      },
    });
  }

  findByPost(postId: string): Promise<Comment[]> {
    return this.commentModel.findAll({
      where: { postId },
    });
  }

  async createComment(comment: Comment): Promise<Comment> {
    return this.commentModel.create(comment);
  }
}
