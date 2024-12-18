import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
export enum VoteValue {
  LIKE = 1,
  DISLIKE = 0,
}
export class CreateVoteDto {
  @IsString()
  ideaId: string;

  @IsEnum(VoteValue)
  value: VoteValue;
}
