import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments, CommentsDocument } from './schema/comments.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
  ) {}

  // Comment qoshish
  async add(ideaId: string, data: string, name?: string): Promise<Object> {
    try {
      const userComment: CommentsDocument = await this.commentsModel.create({
        ideaId,
        comment: data,
        name,
      });

      return userComment;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
