import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository) private userRepository:UserRepository,
        private jwtService:JwtService
    ){

    }


    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
        return this.userRepository.creaeteUser(authCredentialsDto);
    }


    async signIn(AuthCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>{
        const {username, password} = AuthCredentialsDto;
        const user = await this.userRepository.findOne({username});

        if(user && (await bcrypt.compare(password,user.password))){
            const payload: JwtPayload = {username};
            const accessToken:string = await this.jwtService.sign(payload);
            return {accessToken}

        }else{
            throw new UnauthorizedException('Please check your login credentials');
        }
    }


}
