import { Module } from '@nestjs/common';
import { IdeaModule } from './idea/idea.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

@Module({
  imports: [IdeaModule, MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [],
  providers: [],
})
export class AppModule {}
