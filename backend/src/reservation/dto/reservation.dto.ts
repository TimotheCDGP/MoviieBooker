import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  time?: number;
}