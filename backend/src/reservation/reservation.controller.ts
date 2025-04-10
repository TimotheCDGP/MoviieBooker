import { Controller, Post, Get, UseGuards, Req, Query, BadRequestException, Param, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Request } from 'express';
import { ReservationService } from './reservation.service';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common';

interface AuthenticatedRequest extends Request {
  user: { id: number; username: string };
}

@ApiTags('reservation')
@ApiBearerAuth()
@Controller('reservation')
export class ReservationController {
  constructor(private reservationService: ReservationService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'id', required: true, type: Number, description: "ID du film à réserver" })
  @ApiQuery({ name: 'time', required: false, type: Number, description: "Timestamp de réservation (optionnel)" })
  async makeReservation(
    @Req() request: AuthenticatedRequest,
    @Query('id') id: number,
    @Query('time') time?: number,
  ) {
    if (!id) {
      throw new BadRequestException('Paramètre "id" requis pour réserver un film.');
    }

    const userId = request.user.id;
    const reservationTime = time ?? Math.floor(Date.now() / 1000);

    await this.reservationService.reserveFilm(userId, id, reservationTime);

    console.log(`Réservation ajoutée pour l'utilisateur ${userId} -> { id: ${id}, time: ${reservationTime} }`);

    return {
      message: 'Réservation ajoutée avec succès',
      userId,
      reservation: { id, time: reservationTime },
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserReservations(@Req() request: AuthenticatedRequest) {
    const userId = request.user.id;
    const reservations = await this.reservationService.getUserReservations(userId);

    return {
      reservations
    };
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'id', required: true, type: Number, description: "ID du film à supprimer de la réservation" })
  async deleteReservation(
    @Req() request: AuthenticatedRequest,
    @Query('id', ParseIntPipe) filmId: number,
  ) {
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
}