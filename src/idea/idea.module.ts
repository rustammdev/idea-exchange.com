import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Idea, IdeaSchema } from './schema/idea.schema';
import { IpMiddleware } from './middleware/ip.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }]),
  ],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeasModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpMiddleware).forRoutes(IdeaController);
  }
}
