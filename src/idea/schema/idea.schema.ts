import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type IdeaDocument = HydratedDocument<Idea>;

@Schema({ timestamps: true })
export class Idea {
  @Prop({ required: true, type: String })
  title: String;

  @Prop({ required: true, type: String })
  idea: String;
}

export const IdeaSchema = SchemaFactory.createForClass(Idea);
