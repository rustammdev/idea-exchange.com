import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { CreateIdeaDto } from './dto/idea.dto';
import { IdeaService } from './idea.service';

@Controller('idea')
export class IdeaController {
  constructor(private ideaServise: IdeaService) {}

  // Savol qoshish
  @Post()
  async createidea(
    @Body(new ValidationPipe()) ideaData: CreateIdeaDto,
    @Req() req: Request,
  ) {
    const userIp = req['clientIp'];
    return this.ideaServise.create(ideaData, userIp);
  }

  // Barcha savollarni sarlavhasini olish
  @Get()
  async getIdeas(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.ideaServise.findAll(page, limit);
  }
}
