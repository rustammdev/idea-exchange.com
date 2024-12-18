import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIdeaDto } from './dto/idea.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Idea } from './schema/idea.schema';
import { Model } from 'mongoose';

@Injectable()
export class IdeaService {
  constructor(@InjectModel(Idea.name) private ideaModel: Model<Idea>) {}

  async create(createIdeaBody: CreateIdeaDto): Promise<Idea> {
    try {
      return this.ideaModel.create(createIdeaBody);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
