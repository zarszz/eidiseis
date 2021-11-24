import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.models';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.findAll();
  }

  findOne(id: string): Promise<Post> {
    return this.postModel.findOne({
      where: {
        id,
      },
    });
  }

  async createPost(post: Post): Promise<Post> {
    return this.postModel.create(post);
  }

  update(post: Post, id: string) {
    return this.postModel.update(post, { where: { id } });
  }

  delete(id: string) {
    return this.postModel.destroy({ where: { id } });
  }
}
