import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
    signIn(@Body() AuthCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>{
        return this.authService.signIn(AuthCredentialsDto);
    }


    // for testing authorization
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req){
        console.log(req)
    }
}
