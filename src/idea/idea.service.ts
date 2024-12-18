import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIdeaDto } from './dto/idea.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Idea, IdeaDocument } from './schema/idea.schema';
import { Model } from 'mongoose';

@Injectable()
export class IdeaService {
  constructor(@InjectModel(Idea.name) private ideaModel: Model<Idea>) {}

  //   Cerate idea
  async create(createIdeaBody: CreateIdeaDto): Promise<Idea> {
    try {
      return this.ideaModel.create(createIdeaBody);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get Ideas
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.ideaModel.find().skip(skip).limit(limit).exec();
  }

  //   vote
  async vote(userIp: string, ideaId: string, userVote: 0 | 1) {
    try {
      // Ideani topish
      const ideas: IdeaDocument = await this.ideaModel.findById(ideaId);

      if (!ideas)
        throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);

      //   Tekshirish
      const existingVote = ideas.votes.find((vote) => vote.userIp === userIp);

      if (existingVote) {
        if (existingVote.value === userVote) {
          // qayta mavjud bosilgan tugmani bosish
          return { message: 'User alredy voted', code: 409 };
        }

        existingVote.value = userVote;
      } else {
        ideas.votes.push({ userIp, value: userVote });
      }

      await ideas.save();
      return { message: 'User succesfuly voted', ok: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
