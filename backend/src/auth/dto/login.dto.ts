import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

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

}