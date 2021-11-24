import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Comment } from 'src/comment/comment.models';

@Table
export class Post extends Model {
  @Column
  userId: number;

  @Column
  title: string;

  @Column
  body: string;

  @HasMany(() => Comment)
  comments: Comment[];
}
