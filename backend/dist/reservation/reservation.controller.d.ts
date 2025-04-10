import { Request } from 'express';
import { ReservationService } from './reservation.service';
interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        username: string;
    };
}
export declare class ReservationController {
    private reservationService;
    constructor(reservationService: ReservationService);
    makeReservation(request: AuthenticatedRequest, id: number, time?: number): Promise<{
        message: string;
        userId: number;
        reservation: {
            id: number;
            time: number;
        };
    }>;
    getUserReservations(request: AuthenticatedRequest): Promise<{
        reservations: {
            id: number;
            time: number;
        }[];
    }>;
    deleteReservation(request: AuthenticatedRequest, filmId: number): Promise<{
        message: string;
        filmId?: undefined;
    } | {
        message: string;
        filmId: number;
    }>;
}
export {};
