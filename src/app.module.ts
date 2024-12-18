import { Module } from '@nestjs/common';
import { IdeasModule } from './idea/idea.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsModule } from './comments/comments.module';
import 'dotenv/config';

@Module({
  imports: [IdeasModule, MongooseModule.forRoot(process.env.MONGO_URL), CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
