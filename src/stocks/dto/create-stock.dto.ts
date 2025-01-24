import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateStockDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    inputQuantity: number

    @IsNumber()
    @IsOptional()
    @Min(1)
    outputQuantity?: number

    @IsString()
    @IsNotEmpty()
    product: string

}
