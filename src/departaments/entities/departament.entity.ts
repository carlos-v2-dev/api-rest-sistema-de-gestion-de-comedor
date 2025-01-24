import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { ServiceEntity } from "./../../services/entities/service.entity"

@Entity('departament')
export class DepartamentEntity extends BaseEntity {
    @Column({type: "varchar"})
    name: string;

    @Column({type: "varchar"})
    description?: string

    @OneToMany(() => ServiceEntity, (service) => service.departament)
    services: ServiceEntity[];
}
