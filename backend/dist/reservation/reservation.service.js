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
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
let ReservationService = class ReservationService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async reserveFilm(userId, filmId, time) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        const now = Math.floor(Date.now() / 1000);
        const TWO_HOURS = 2 * 60 * 60;
        console.log(now + " et " + time);
        if (time < now) {
            throw new common_1.ConflictException("Séance expirée. Impossible de réserver un film dans le passé.");
        }
        const conflict = user.reservations.find(res => {
            return Math.abs(res.time - time) < TWO_HOURS;
        });
        if (conflict) {
            const conflictTime = new Date(conflict.time * 1000);
            const formattedTime = conflictTime.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
            });
            throw new common_1.ConflictException(`Conflit avec une réservation existante à ${formattedTime}. Respectez un délai de 2h entre chaque séance.`);
        }
        const reservation = { id: filmId, time };
        user.reservations.push(reservation);
        await this.userRepository.save(user);
        return user;
    }
    async getUserReservations(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        return user.reservations;
    }
    async deleteReservation(userId, filmId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        const initialLength = user.reservations.length;
        user.reservations = user.reservations.filter(res => res.id !== filmId);
        const finalLength = user.reservations.length;
        if (initialLength === finalLength) {
            return false;
        }
        await this.userRepository.save(user);
        return true;
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReservationService);
//# sourceMappingURL=reservation.service.js.map