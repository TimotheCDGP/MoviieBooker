import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMoviesDto {
  @ApiPropertyOptional({
    description: 'Pagination (entre 1 et 25)',
    example: 1
  })
  @IsOptional()
  @Max(25)
  @Min(1)
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Recherche de film par titre',
    example: 'Titanic',
  })
  @IsOptional()
  @IsString()
  search?: string;

  // pas implémenté car souci avec l'api externe à fix si temps
  // mais ça ne change rien au résultat de la requête
  @ApiPropertyOptional({
    description: 'Tri par catégorie — NON FONCTIONNEL',
    example: 'category.desc',
  })
  @IsOptional()
  @IsString()
  sort?: string;
}