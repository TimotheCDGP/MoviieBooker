import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMoviesDto {
  @ApiPropertyOptional({ description: 'Numéro de page (pagination)' })
  @IsOptional()
  @Max(25)
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Recherche de film par titre' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Critère de tri (ex: popularity.desc)' })
  @IsOptional()
  @IsString()
  sort?: string;
}