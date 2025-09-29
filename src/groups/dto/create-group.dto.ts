import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateGroupDto {
  @MinLength(3)
  @IsNotEmpty()
  name: string;
}
