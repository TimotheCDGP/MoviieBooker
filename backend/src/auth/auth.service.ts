import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Identifiants incorrects');
    }

    async login(username: string, password: string) {
        const user = await this.validateUser(username, password);
        const payload = { username: user.username, sub: user.id };
        return this.jwtService.sign(payload, { expiresIn: '30m' })
    }

    async register(username: string, password: string, email: string) {
       
        const existingUser = await this.userService.findByUsername(username);
        if (existingUser) {
            throw new ConflictException("Nom d'utilisateur déjà utilisé !");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userService.createUser(username, hashedPassword, email);
        
        return {
            message: "Utilisateur " + newUser.username + " créé avec succès !"
        };
    }
}