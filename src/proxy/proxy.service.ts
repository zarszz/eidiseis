import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Comment, Post as PostModel } from './entity';
import { Post as PostDBModel } from '../post/post.models';
import { PostService } from 'src/post/post.service';

@Injectable()
export class ProxyService {
  constructor(private readonly postService: PostService) {}
  async create(post: PostModel) {
    const response: AxiosResponse = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      post,
    );
    const result: PostModel = response.data;
    return result;
  }

  async findAll(): Promise<PostModel[]> {
    const response: AxiosResponse = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
    );
    const posts: PostModel[] = response.data;
    return posts;
  }

  async findOne(id: number) {
    const response: AxiosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    const post: PostModel = response.data;
    return post;
  }

  async findPostComments(id: number) {
    const response: AxiosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    );
    const comments: Comment[] = response.data;
    return comments;
  }

  async update(id: number, post: PostModel) {
    const response: AxiosResponse = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      post,
    );
    return response.data;
  }

  async partialUpdate(id: number, post: PostModel) {
    const response: AxiosResponse = await axios.patch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      post,
    );
    return response.data;
  }

  async remove(id: number) {
    const response: AxiosResponse = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    return response.data;
  }

  async findAllAndSave() {
    const response: AxiosResponse = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
    );
    const posts: PostModel[] = response.data;
    const postsData = <PostDBModel[]>posts;

    this.postService.bulkInsert(postsData);

    return posts;
  }
}
