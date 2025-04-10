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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const movies_service_1 = require("./movies.service");
const getMovies_dto_1 = require("./dto/getMovies.dto");
const swagger_1 = require("@nestjs/swagger");
let MoviesController = class MoviesController {
    moviesService;
    constructor(moviesService) {
        this.moviesService = moviesService;
    }
    getMovies(query) {
        return this.moviesService.getMovies(query);
    }
};
exports.MoviesController = MoviesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Récupérer des films" }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        description: 'Pagination (entre 1 et 25)',
        type: Number,
        example: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Recherche de film par titre',
        type: String,
        example: 'Titanic',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sort',
        required: false,
        description: 'Tri par catégorie — NON FONCTIONNEL',
        type: String,
        example: 'category.desc',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getMovies_dto_1.GetMoviesDto]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "getMovies", null);
exports.MoviesController = MoviesController = __decorate([
    (0, swagger_1.ApiTags)('Films'),
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movies_service_1.MoviesService])
], MoviesController);
//# sourceMappingURL=movies.controller.js.map