import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { GetMoviesDto } from './dto/getMovies.dto';
import { ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';

@ApiTags('Films')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: "Récupérer des films" })

  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Pagination (entre 1 et 25)',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Recherche de film par titre',
    type: String,
    example: 'Titanic',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Tri par catégorie — NON FONCTIONNEL',
    type: String,
    example: 'category.desc',
  })
  getMovies(@Query() query: GetMoviesDto) {
    return this.moviesService.getMovies(query);
  }
}