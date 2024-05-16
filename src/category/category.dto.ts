import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CatDto {
  @IsUUID()
  id: string; // uuid v4
  name: string;
  type: string;
  start: number;
  @IsUUID()
  userId: string;
}

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  start: number;

  @IsUUID()
  userId: string;
}
