import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIdeaDto } from './dto/idea.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Idea, IdeaDocument } from './schema/idea.schema';
import { Model } from 'mongoose';

@Injectable()
export class IdeaService {
  constructor(@InjectModel(Idea.name) private ideaModel: Model<Idea>) {}

  // Cerate idea
  async create(createIdeaBody: CreateIdeaDto, userIp: string): Promise<Idea> {
    try {
      return this.ideaModel.create({ owner: userIp, ...createIdeaBody });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get Ideas
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.ideaModel.find().skip(skip).limit(limit).exec();
  }

  // Get unique Idea
  async getIdea(id: string): Promise<Object> {
    return this.ideaModel.findById({ _id: id });
  }

  // Del comments
  async del(ideaId: string, userIp: string) {
    const comment = await this.ideaModel
      .findById({ _id: ideaId })
      .select('owner');

    if (comment.owner != userIp)
      throw new HttpException('No permission to delete the resource.', 403);

    return await this.ideaModel.findByIdAndDelete({ id: ideaId });
  }
}
