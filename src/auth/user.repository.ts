import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async creaeteUser(AuthCredentialsDto:AuthCredentialsDto):Promise<void>{
        const {username,password} = AuthCredentialsDto;

        const user = this.create({username, password})

        await this.save(user);

  
    }
}