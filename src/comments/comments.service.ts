import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments, CommentsDocument } from './schema/comments.schema';
import { Idea } from 'src/idea/schema/idea.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
    @InjectModel(Idea.name) private IdeaModel: Model<Idea>,
  ) {}

  // Get comments
  async get(id: string) {
    const comments = await this.commentsModel.find({ ideaId: id });

    if (!comments)
      throw new HttpException(
        'Siz bergan id yaroqli emas',
        HttpStatus.NOT_FOUND,
      );
    return comments;
  }

  // Comment qoshish
  async add(ideaId: string, data: string, name?: string): Promise<Object> {
    // ideani mavjudlikka tekshirish
    const isExist = await this.IdeaModel.findById({ _id: ideaId });
    if (!isExist) {
      throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);
    }
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
