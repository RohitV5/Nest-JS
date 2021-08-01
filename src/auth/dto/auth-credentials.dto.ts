import { MinLength,IsString,MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto{

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message: 'password is too weak'})
    password:string;

}