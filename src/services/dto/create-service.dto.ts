import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
    @IsString()
    @IsOptional()
    description?: string;

    @IsNotEmpty()
    @IsString()
    user: string;

    @IsNotEmpty()
    @IsString()
    departament: string;
}
