import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIdeaDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  idea: string;
}
