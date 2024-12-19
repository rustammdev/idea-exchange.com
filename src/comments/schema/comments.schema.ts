import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommentsDocument = HydratedDocument<Comments>;

@Schema({ timestamps: true })
export class Comments {
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  ideaId: string;

  @Prop({ required: true, type: String, unique: true })
  comment: string;

  @Prop({ required: false, type: String, default: 'no-name' })
  name: string;

  @Prop({
    type: Number,
    default: 0,
  })
  likeCount: Number;

  @Prop({
    type: Number,
    default: 0,
  })
  unlikeCount: Number;

  @Prop({ type: [String], required: false })
  likedUsers: [string];

  @Prop({ type: [String], required: false })
  unLikedUsers: [string];
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
