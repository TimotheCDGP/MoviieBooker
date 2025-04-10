import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class MoviesService {
    private httpService;
    private configService;
    constructor(httpService: HttpService, configService: ConfigService);
    getMovies({ page, search, sort }: {
        page?: number;
        search?: string;
        sort?: string;
    }): Promise<any>;
}
