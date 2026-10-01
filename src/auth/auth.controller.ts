import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const usertoken = await this.authService.validateUser(data);

    if (!usertoken) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    
    return usertoken;
  }
}