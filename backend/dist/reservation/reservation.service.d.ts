import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
export declare class ReservationService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    reserveFilm(userId: number, filmId: number, time: number): Promise<User>;
    getUserReservations(userId: number): Promise<{
        id: number;
        time: number;
    }[]>;
    deleteReservation(userId: number, filmId: number): Promise<boolean>;
}
