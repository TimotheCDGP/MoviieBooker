import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(username: string, password: string, email: string): Promise<User>;
    findByUsername(username: string): Promise<User | undefined>;
    addReservation(userId: number, reservation: {
        id: number;
        time: number;
    }): Promise<void>;
}
