import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentsDto {
  @IsNotEmpty()
  @IsString()
  ideaId: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsOptional()
  @IsString()
  name?: string;
}
