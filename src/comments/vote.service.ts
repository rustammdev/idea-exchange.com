import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Comments } from './schema/comments.schema';

export class VoteService {
  constructor(
    @InjectModel(Comments.name) private commentModel: Model<Comments>,
  ) {}

  async vote(userIp: string, ideaId: string) {
    try {
      const comment = await this.commentModel.findById({ _id: ideaId });
      if (!comment) {
        throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);
      }

      const likedUser = comment.likedUsers.includes(userIp);
      const unLikedUser = comment.unLikedUsers.includes(userIp);

      if (likedUser) {
        await this.commentModel.updateOne(
          { _id: ideaId },
          {
            $pull: { likedUsers: userIp },
            $inc: { likeCount: -1 },
          },
        );
      } else {
        await this.commentModel.updateOne(
          { _id: ideaId },
          {
            $push: { likedUsers: userIp },
            $pull: { unLikedUsers: userIp },
            $inc: {
              likeCount: 1,
              ...(unLikedUser && { unlikeCount: -1 }),
            },
          },
        );
      }

      const updatedIdea = await this.commentModel.findById(ideaId);
      return {
        voteStatus: likedUser ? 0 : 1,
        likeCount: updatedIdea.likeCount,
        unlikeCount: updatedIdea.unlikeCount,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async unvote(userIp: string, ideaId: string) {
    try {
      const comment = await this.commentModel.findById(ideaId);
      if (!comment) {
        throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);
      }

      const likedUser = comment.likedUsers.includes(userIp);
      const unLikedUser = comment.unLikedUsers.includes(userIp);

      if (unLikedUser) {
        await this.commentModel.updateOne(
          { _id: ideaId },
          {
            $pull: { unLikedUsers: userIp },
            $inc: { unlikeCount: -1 },
          },
        );
      } else {
        await this.commentModel.updateOne(
          { _id: ideaId },
          {
            $push: { unLikedUsers: userIp },
            $pull: { likedUsers: userIp },
            $inc: {
              unlikeCount: 1,
              ...(likedUser && { likeCount: -1 }),
            },
          },
        );
      }

      const updatedIdea = await this.commentModel.findById(ideaId);
      return {
        voteStatus: unLikedUser ? 0 : -1,
        voteCount: updatedIdea.likeCount,
        unvoteCount: updatedIdea.unlikeCount,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
