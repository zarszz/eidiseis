import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Put,
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
  findAll() {
    return this.proxyService.findAll();
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProxyDto: UpdateProxyDto) {
  //   return this.proxyService.update(+id, updateProxyDto);
  //}

  @Delete('/posts/:id')
  remove(@Param('id') id: string) {
    return this.proxyService.remove(+id);
  }
}
