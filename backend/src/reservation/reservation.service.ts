import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async reserveFilm(userId: number, filmId: number, time: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
  
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
  
    const now = Math.floor(Date.now() / 1000);
    const TWO_HOURS = 2 * 60 * 60;
  
    if (time < now) {
      throw new ConflictException("Séance expirée. Impossible de réserver une séance dans le passé.");
    }
  
    const hasTooCloseReservation = user.reservations.some(res => {
      return Math.abs(res.time - time) < TWO_HOURS;
    });
  
    if (hasTooCloseReservation) {
      throw new ConflictException("Vous devez respecter un écart de 2 heures entre chaque réservation.");
    }
  
    const reservation = { id: filmId, time };
    user.reservations.push(reservation);
  
    await this.userRepository.save(user);
    return user;
  }

  async getUserReservations(userId: number): Promise<{ id: number; time: number }[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    return user.reservations;
  }

  async deleteReservation(userId: number, filmId: number): Promise<boolean> {
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

}