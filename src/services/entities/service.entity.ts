import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { DepartamentEntity } from "./../../departaments/entities/departament.entity";
import { UserEntity } from "./../../users/entities/user.entity";


@Entity('service')
export class ServiceEntity extends BaseEntity {
    @Column({type: "varchar", nullable: true})
    description?: string;

    @ManyToOne(() => UserEntity, (user) => user.services)
    @JoinColumn({name: 'User_id'})
    user: string;

    @ManyToOne(() => DepartamentEntity, (departament) => departament.services)
    @JoinColumn({name: 'departament_id'})
    departament: string;
}
