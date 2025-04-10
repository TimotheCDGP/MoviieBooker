export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    reservations: {
        id: number;
        time: number;
    }[];
}
