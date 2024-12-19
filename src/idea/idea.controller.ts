import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateIdeaDto } from './dto/idea.dto';
import { IdeaService } from './idea.service';

@Controller('idea')
export class IdeaController {
  constructor(private ideaServise: IdeaService) {}

  // Savol qoshish
  @Post()
  async createidea(@Body(new ValidationPipe()) ideaData: CreateIdeaDto) {
    return this.ideaServise.create(ideaData);
  }

  // Barcha savollarni sarlavhasini olish
  @Get()
  async getIdeas(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.ideaServise.findAll(page, limit);
  }

  @Get(':id')
  async getIdea(@Param('id') id: string) {
    return this.ideaServise.getIdea(id);
  }
}
