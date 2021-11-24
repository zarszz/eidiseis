import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from 'src/post/post.models';

@Table
export class Comment extends Model {
  @ForeignKey(() => Post)
  postId: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  body: string;

  @BelongsTo(() => Post)
  post: Post;
}
