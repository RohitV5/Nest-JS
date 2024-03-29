import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async creaeteUser(AuthCredentialsDto:AuthCredentialsDto):Promise<void>{
        const {username,password} = AuthCredentialsDto;

        // hash
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password,salt)


        const user = this.create({username, password: hashPassword})

        try{
            await this.save(user);

        }catch(error){
            console.log(error.code)
            if(error.code === '23505'){
                throw new ConflictException('Username already exist');
            } //duplicate username
            else{
                throw new InternalServerErrorException();
            }
        }

        
  
    }
}