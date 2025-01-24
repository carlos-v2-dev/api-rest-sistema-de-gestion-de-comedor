import { ServiceEntity } from "./../../services/entities/service.entity";
import { BaseEntity } from "./../../common/config/base.entity";
import { UserGender } from "./../../common/enums/user-gender.enum";
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({  name: "user" })
export class UserEntity extends BaseEntity {
    @Column({type: 'varchar'})
    name: string;

    @Column({type: "varchar", unique: true})
    dni: string;

    @Column({type: "int"})
    age: number

    @Column({type: 'enum', enum: UserGender})
    gender: UserGender;

    @Column({type: 'varchar', nullable: true})
    photo?: string;

    @OneToMany(() => ServiceEntity, (service) => service.user)
    services: ServiceEntity[];
}
