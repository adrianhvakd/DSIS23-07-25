import { Controller, Get, Param, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClienteService } from './cliente.service';
import { Paginate } from 'src/shared/paginate';
import { createReadStream } from 'fs';
import { join } from 'path';
import { printPDF } from 'src/shared/printPDF';
import { Reporte } from 'src/shared/reporte';
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
        const printReport:Reporte = new printPDF()
        printReport.generarReportCliente(clientes,'test.pdf')
        const file = createReadStream(join(process.cwd(),'reports/test.pdf'));
        return file.pipe(res);
    }
    @Get('GenerarPrint')
    async generarPrint(@Res() res:Response){
        const clientes = await this.clienteService.getAll();
        const printReport:Reporte = new Print()
        return res.send(printReport.generarReportCliente(clientes,''));
    }

    @Get('qr/:id')
    qr(@Param() {id}, @Res() res:Response){

        const pago = {
            cliente:'Juanito Perez',
            fecha:Date.now,
            numeroBoleta: 123,
            monto:1000
        }
        return res.render('cliente/qr',{
            title: 'pago',
            pago});
    }
    
}
