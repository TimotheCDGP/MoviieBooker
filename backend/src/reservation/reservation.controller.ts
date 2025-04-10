import { Controller, Post, Get, UseGuards, Req, Query, BadRequestException, Param, Delete, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Request } from 'express';
import { ReservationService } from './reservation.service';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common';
// import { CreateReservationDto } from './dto/reservation.dto';
// pb avec le dto & Body, à fix car moche 

interface AuthenticatedRequest extends Request {
  user: { id: number; username: string };
}

@ApiTags('Réservation')
@ApiBearerAuth()
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Créer une réservation pour l'utilisateur connecté",
    description: "Les réservations nécessitent l'ID du film et le timestamp UNIX (horaire choisi). Si vous ne renseignez pas d'horaire, ce sera l'heure actuelle qui sera choisie."
  })
  @ApiParam({ name: 'id', description: "ID du film à réserver", type: Number })
  @ApiQuery({ name: 'time', required: false, description: "Timestamp de réservation (optionnel)" })
  async makeReservation(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: number,
    @Query('time') time: number,
  ) {
    if (!id) {
      throw new BadRequestException('Le champ "id" est requis pour réserver un film.');
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

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Récupérer les réservations de l'utilisateur" })

  async getUserReservations(@Req() request: AuthenticatedRequest) {
    const userId = request.user.id;
    const reservations = await this.reservationService.getUserReservations(userId);

    return {
      reservations,
    };
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Supprimer une réservation pour l'utilisateur connecté" })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
    description: "ID du film à supprimer de la réservation",
    example: 123,
  })
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