import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('Authentification (Inscription & Connexion)')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')

  @ApiOperation({
    summary: "Inscription d'un utilisateur",
    description: "Ajout d'un utilisateur à la base de données"
  })
  @ApiBody({ type: RegisterDto })

  async register(@Body() registerDto: RegisterDto) {
    const { username, password, email } = registerDto;
    return this.authService.register(username, password, email);
  }

  @Post('login')
  @ApiOperation({
    summary: "Connexion d'un utilisateur",
    description: "Renvoi d'un token de connexion JWT"
  })
  @ApiBody({ type: LoginDto })

  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    return this.authService.login(username, password);
  }

}