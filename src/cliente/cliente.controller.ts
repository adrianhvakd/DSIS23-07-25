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

    @Get('map')
    mapa(@Res() res:Response){
        const puestos = [
            {
                numero:1,
                ubicacion: 'H. Vasquez potoquito',
                lat1: -19.584879,
                laong1: -65.760508,
                lat2: -19.584880,
                laong2: -65.760509,
                lat3: -19.584878,
                laong3: -65.760508,
                lat4: -19.584879,
                laong4: -65.760509,
                precio: 80,
                disponible: false,
                vendido: 'juanito perez',
                factura: 11547
            },
            {
                numero:2,
                ubicacion: 'H. Vasquez potoquito',
                lat1: -19.584611,
                laong1: -65.760573,
                lat2: -19.584612,
                laong2: -65.760573,
                lat3: -19.584612,
                laong3: -65.760574,
                lat4: -19.584611,
                laong4: -65.760574,
                precio: 80,
                disponible: true,
                vendido: 'Pepito perez',
                factura: 11547
            },
            {
                numero:3,
                ubicacion: 'H. Vasquez potoquito',
                lat1: -19.584250,
                laong1: -65.760707,
                lat2: -19.584251,
                laong2: -65.760707,
                lat3: -19.584251,
                laong3: -65.760708,
                lat4: -19.584250,
                laong4: -65.760708,
                precio: 80,
                disponible: true,
                vendido: 'Ivana perez',
                factura: 11547
            }
        ];
        res.render('cliente/map',
            {
                title: 'Mapa del recorrido',
                puestos
            });
    }
    
}
