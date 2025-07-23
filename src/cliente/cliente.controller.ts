import { Controller, Get, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
    
    constructor(private clienteService:ClienteService){}
    paginar(actual,items,countItems){
        let paginacion= {
            paginas:Array(),
            paginaActual:actual,
            siguiente:true,
            anterior:true,
            itemPaginas:items,
            paginaAnterior:Number(actual)-(1*items),
            paginaSiguiente:Number(actual)+(1*items),
        }        
        paginacion.siguiente=
            ((countItems/2)*items)===(Number(paginacion.paginaActual)+Number(items));
        paginacion.anterior=paginacion.paginaActual==0;
        for(let i=0;i<countItems/2;i++)
            paginacion.paginas.push({
                pagina:i+1,
                skip:i*items,
                activo:paginacion.paginaActual/items==(i)});
        return paginacion;
    }
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
            paginacion: buscar ? null : this.paginar(actual, items, clientes.count),
        });

    }
    
}
