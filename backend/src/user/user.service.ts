import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(username: string, password: string, email: string): Promise<User> {

    const newUser = this.userRepository.create({
      username,
      password,
      email,
    });
    
    return await this.userRepository.save(newUser);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user ?? undefined;
  }

  async addReservation(userId: number, reservation: { id: number; time: number }) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
  
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
  
    user.reservations.push(reservation);
    await this.userRepository.save(user);
  }

}