import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import JoiValidationPipe from 'src/task/joiValidationPipe';
import { LoginDto } from './login.dto';
import { LoginSchema } from './auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new JoiValidationPipe(LoginSchema))
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}
