import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) { }

    async getMovies({ page = 1, search, sort }: { page?: number; search?: string; sort?: string }) {
        const baseUrl = this.configService.get<string>('API_URL');
        const accessToken = this.configService.get<string>('API_KEY');
      
        const endpoint = search ? '/search/movie' : '/movie/now_playing';
        const url = `${baseUrl}${endpoint}`;
      
        const response = await firstValueFrom(
          this.httpService.get(url, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              page,
              query: search,
              sort_by: sort,
              language: 'fr-FR',
            },
          }),
        );
      
        return response.data;
      }
}