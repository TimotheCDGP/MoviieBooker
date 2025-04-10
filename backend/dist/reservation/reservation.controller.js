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
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt.auth.guard");
const reservation_service_1 = require("./reservation.service");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
let ReservationController = class ReservationController {
    reservationService;
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async makeReservation(request, id, time) {
        if (!id) {
            throw new common_1.BadRequestException('Le champ "id" est requis pour réserver un film.');
        }
        const userId = request.user.id;
        const reservationTime = time ?? Math.floor(Date.now() / 1000);
        await this.reservationService.reserveFilm(userId, id, reservationTime);
        return {
            message: 'Réservation ajoutée avec succès',
            userId,
            reservation: { id, time: reservationTime },
        };
    }
    async getUserReservations(request) {
        const userId = request.user.id;
        const reservations = await this.reservationService.getUserReservations(userId);
        return {
            reservations,
        };
    }
    async deleteReservation(request, filmId) {
        const userId = request.user.id;
        const deleted = await this.reservationService.deleteReservation(userId, filmId);
        if (!deleted) {
            return {
                message: `Aucune réservation trouvée pour le film ${filmId}`,
            };
        }
        return {
            message: 'Réservation supprimée avec succès',
            filmId,
        };
    }
};
exports.ReservationController = ReservationController;
__decorate([
    (0, common_1.Post)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: "Créer une réservation pour l'utilisateur connecté",
        description: "Les réservations nécessitent l'ID du film et le timestamp UNIX (horaire choisi). Si vous ne renseignez pas d'horaire, ce sera l'heure actuelle qui sera choisie."
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: "ID du film à réserver", type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'time', required: false, description: "Timestamp de réservation (optionnel)" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)('time')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "makeReservation", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Récupérer les réservations de l'utilisateur" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getUserReservations", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Supprimer une réservation pour l'utilisateur connecté" }),
    (0, swagger_1.ApiQuery)({
        name: 'id',
        required: true,
        type: Number,
        description: "ID du film à supprimer de la réservation",
        example: 123,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "deleteReservation", null);
exports.ReservationController = ReservationController = __decorate([
    (0, swagger_1.ApiTags)('Réservation'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('reservation'),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationController);
//# sourceMappingURL=reservation.controller.js.map