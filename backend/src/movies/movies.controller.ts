import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { GetMoviesDto } from './dto/getMovies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies(@Query() query: GetMoviesDto) {
    return this.moviesService.getMovies(query);
  }
}