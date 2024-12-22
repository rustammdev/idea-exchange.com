import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto';
import { VoteService } from './vote.service';

@Controller('comment')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private voteService: VoteService,
  ) {}

  @Get(':id')
  async getComments(@Param('id') id: string) {
    return this.commentsService.get(id);
  }

  @Post(':id')
  addComments(@Param('id') id: string, @Body() bodyData: CreateCommentsDto) {
    const { comment } = bodyData;
    const name: string = bodyData.name ?? 'no-name';

    return this.commentsService.add(id, comment, name);
  }

  // Mavjud javobga vote berish
  @Post(':id/vote')
  async likeIdea(@Param('id') id: string, @Req() req: Request) {
    const userIp = req['clientIp'];
    return await this.voteService.vote(userIp, id);
  }

  // Mavjud javobga unvote berish
  @Post(':id/unvote')
  async unlikeIdea(@Param('id') id: string, @Req() req: Request) {
    const userIp = req['clientIp'];
    return await this.voteService.unvote(userIp, id);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string, @Req() req: Request) {
    const userIp = req['clientIp'];
    return await this.commentsService.del(id, userIp);
  }
}
