import { IsUUID } from 'class-validator';

export class ActDto {
  @IsUUID()
  id: string; // uuid v4
  sum: number;
  ts: string;
  @IsUUID()
  from: string;
  @IsUUID()
  to: string;
}

export class CreateActDto {
  sum: number;
  ts: string;
  @IsUUID()
  from: string;
  @IsUUID()
  to: string;
}
