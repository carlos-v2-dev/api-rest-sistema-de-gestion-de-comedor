import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UserGender } from "./../../common/enums/user-gender.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    dni: string;

    @IsNumber()
    @IsNotEmpty()
    age: number

    @IsNotEmpty()
    @IsEnum(UserGender)
    gender: UserGender;

    @IsString()
    @IsOptional()
    photo?: string;
}
