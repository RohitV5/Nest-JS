import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserRepository) private userRepository:UserRepository){

    }


    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
        return this.userRepository.creaeteUser(authCredentialsDto);
    }


    async signIn(AuthCredentialsDto:AuthCredentialsDto):Promise<string>{
        const {username, password} = AuthCredentialsDto;
        const user = await this.userRepository.findOne({username});

        if(user && (await bcrypt.compare(password,user.password))){
            return 'success';
        }else{
            throw new UnauthorizedException('Please check your login credentials');
        }
    }


}
