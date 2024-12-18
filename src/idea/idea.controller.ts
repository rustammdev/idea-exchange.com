import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateIdeaDto } from './dto/idea.dto';
import { IdeaService } from './idea.service';

@Controller('idea')
export class IdeaController {
  constructor(private ideaServise: IdeaService) {}

  @Post()
  async createidea(@Body(new ValidationPipe()) ideaData: CreateIdeaDto) {
    return this.ideaServise.create(ideaData);
  }
}
