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

  // Get Idea
  async getIdea(id: string): Promise<Object> {
    return this.ideaModel.findById({ _id: id });
  }
}
