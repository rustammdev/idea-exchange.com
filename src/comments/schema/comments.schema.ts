import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommentsDocument = HydratedDocument<Comments>;

@Schema({ timestamps: true })
export class Comments {
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  ideaId: String;

  @Prop({ required: true, type: String })
  comment: String;

  @Prop({ required: false, type: String, default: 'no-name' })
  name: String;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
