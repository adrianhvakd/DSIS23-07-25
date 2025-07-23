import { Column, Entity, FindOperator, PrimaryGeneratedColumn } from "typeorm";

@Entity('cliente')
export class ClienteEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column('varchar')
    nombres:string | FindOperator<string>;

    @Column('varchar')
    apellidos:string | FindOperator<string>;

    @Column('varchar')
    codVivienda:string | FindOperator<string>;

    @Column('boolean',{default:false})
    pagoImpuesto:boolean
}