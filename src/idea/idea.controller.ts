import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { CreateIdeaDto } from './dto/idea.dto';
import { IdeaService } from './idea.service';
import { Request } from 'express';
import { CreateVoteDto } from './dto';

@Controller('idea')
export class IdeaController {
  constructor(private ideaServise: IdeaService) {}

  @Post()
  async createidea(@Body(new ValidationPipe()) ideaData: CreateIdeaDto) {
    return this.ideaServise.create(ideaData);
  }

  @Get()
  async getIdeas(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.ideaServise.findAll(page, limit);
  }

  @Post('vote')
  async vote(@Req() req: Request, @Body() data: CreateVoteDto) {
    const { ideaId, value } = data;
    // IP manzilini olish
    const userIp: string = req['userIp'];

    return this.ideaServise.vote(userIp, ideaId, value);
  }
}
