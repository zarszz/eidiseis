import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { Post as PostModel } from './entity';
import { ProxyService } from './proxy.service';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post('/posts')
  create(@Body() post: PostModel) {
    return this.proxyService.create(post);
  }

  @Get('/posts')
  findAll(@Query('save') save: string) {
    return Boolean(JSON.parse(save))
      ? this.proxyService.findAllAndSave()
      : this.proxyService.findAll();
  }

  @Get('/posts/:id')
  findOne(@Param('id') id: string) {
    return this.proxyService.findOne(+id);
  }

  @Get('/posts/:id/comments')
  findPostComments(@Param('id') id: string) {
    return this.proxyService.findPostComments(+id);
  }

  @Put('/posts/:id')
  update(@Param('id') id: string, @Body() post: PostModel) {
    return this.proxyService.update(+id, post);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() post: PostModel) {
    return this.proxyService.partialUpdate(+id, post);
  }

  @Delete('/posts/:id')
  remove(@Param('id') id: string) {
    return this.proxyService.remove(+id);
  }
}
