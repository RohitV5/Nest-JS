import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){

    }

    @Post('/signup')
    signUp(@Body() AuthCredentialsDto: AuthCredentialsDto):Promise<void>{
        return this.authService.signUp(AuthCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() AuthCredentialsDto:AuthCredentialsDto):Promise<string>{
        return this.authService.signIn(AuthCredentialsDto);
    }
}
