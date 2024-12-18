import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IdeaDocument = HydratedDocument<Idea>;

@Schema({ timestamps: true })
export class Idea {
  @Prop({ required: true, type: String })
  title: String;

  @Prop({ required: true, type: String })
  idea: String;

  @Prop({ type: Number, default: 0 })
  voted: number;

  @Prop({ type: Number, default: 0 })
  unvoted: number;
}

export const IdeaSchema = SchemaFactory.createForClass(Idea);
