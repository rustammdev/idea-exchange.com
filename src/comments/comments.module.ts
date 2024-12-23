import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsSchema } from './schema/comments.schema';
import { VoteService } from './vote.service';
import { IpMiddleware } from 'src/idea/middleware/ip.middleware';
import { Idea, IdeaSchema } from 'src/idea/schema/idea.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
      { name: Idea.name, schema: IdeaSchema },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, VoteService],
})
export class CommentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpMiddleware).forRoutes(CommentsController);
  }
}
