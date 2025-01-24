import { UserRole } from "./../../common/enums/user-role.enum";
import { BaseEntity } from "./../../common/config/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class AuthEntity extends BaseEntity{
    @Column({type: "varchar"})
    fullName: string;

    @Column({type:"varchar"})
    email: string;

    @Column({type: "varchar"})
    password: string;

    @Column( {type: "enum", enum: UserRole, default: UserRole.ADMIN} )
    role: UserRole;
}