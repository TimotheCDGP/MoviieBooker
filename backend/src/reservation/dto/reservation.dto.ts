import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({
    description: "ID du film à réserver",
    example: 123,
  })
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiPropertyOptional({
    description: "Heure de réservation (Défaut : maintenant)",
    example: 1712779200,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  time?: number;
}