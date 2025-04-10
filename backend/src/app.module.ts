import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config'
import { ReservationModule } from './reservation/reservation.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'moviedb', 
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    MoviesModule,
    ReservationModule,
  ],
})
export class AppModule {}