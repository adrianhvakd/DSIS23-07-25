import { Controller, Get, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClienteService } from './cliente.service';
import { Paginate } from 'src/shared/paginate';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Print } from 'src/shared/print';
@Controller('cliente')
export class ClienteController {
    
    constructor(private clienteService:ClienteService){}
    
    @Get('')
    //@Render('')//1
    async index(@Res() res:Response,
        @Query('paginaActual') actual=0,
        @Query('itemPaginas') items=2,
        @Query('buscar') buscar = ''){
            //actual--;
        const clientes = await  
        this.clienteService.getAllPagination(items,actual,buscar);        
        return res.render('cliente/index',{
            title: 'Lista Cliente',
            clientes: clientes,
            buscar: buscar,
            paginacion: buscar ? null : Paginate.getInstance().paginar(actual, items, clientes.count),
        });
    }
    @Get('GenerarPdf')
    async generarPdf(@Res() res:Response){
        const clientes = await this.clienteService.getAll();
        
        const printReport = new Print()
        printReport.generarReportCliente(clientes,'test.pdf')

        const file = createReadStream(join(process.cwd(),'reports/test.pdf'));
        return file.pipe(res);
    }
    
}
