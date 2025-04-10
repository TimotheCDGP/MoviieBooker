import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module'; // <= important

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}