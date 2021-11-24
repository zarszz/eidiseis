import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [PostModule],
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class ProxyModule {}
