import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from './entities/cliente.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ClienteService {
    constructor (
        @InjectRepository(ClienteEntity)
        private clienteRepository:Repository<ClienteEntity>){}
    public async getAllPagination(limit,offset,buscar=''){
        let where: Partial<ClienteEntity>[] = [];
        if (buscar && buscar.trim() !== '') {
            where = [
                { nombres: ILike(`%${buscar}%`) },
                { apellidos: ILike(`%${buscar}%`) },
                { codVivienda: ILike(`%${buscar}%`) },
            ];
        }
        const options: any = {
            where: where.length ? where : undefined,
        };

        if (!buscar || buscar.trim() === '') {
            options.take = limit;
            options.skip = offset;
        }
        const [data,cantidad] = await this.clienteRepository.findAndCount(options);
        //console.log();
        return {
            result:data,
            count:cantidad
        }
    }
    public async getAll(){
        return await this.clienteRepository.find();
    }
    public GetId(id){}
}
