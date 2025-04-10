"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let MoviesService = class MoviesService {
    httpService;
    configService;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    async getMovies({ page = 1, search, sort }) {
        const baseUrl = this.configService.get('API_URL');
        const accessToken = this.configService.get('API_KEY');
        const endpoint = search ? '/search/movie' : '/movie/now_playing';
        const url = `${baseUrl}${endpoint}`;
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
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
        }));
        return response.data;
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], MoviesService);
//# sourceMappingURL=movies.service.js.map