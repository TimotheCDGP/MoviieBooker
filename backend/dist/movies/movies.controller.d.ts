import { MoviesService } from './movies.service';
import { GetMoviesDto } from './dto/getMovies.dto';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    getMovies(query: GetMoviesDto): Promise<any>;
}
