
import { BaseEntity } from "../../common/config/base.entity";
import { Column, Entity } from "typeorm";

@Entity('stock')
export class StockEntity extends BaseEntity{

@Column({type: "int"})
inputQuantity: number

@Column({type: "int" , default: 0})
outputQuantity?: number

@Column({type: "varchar"})
product: string
}

