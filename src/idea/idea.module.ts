import { Module } from '@nestjs/common';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Idea, IdeaSchema } from './schema/idea.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }]),
  ],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeasModule {}
