import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: "Nom d'utilisateur",
    example: 'test',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Mot de passe',
    example: 'password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Adresse email',
    example: 'test@test.com',
  })
  @IsEmail()
  email: string;
}