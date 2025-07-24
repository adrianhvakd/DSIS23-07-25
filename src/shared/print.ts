import {Reporte} from './reporte';
export class Print implements Reporte{
    generarReportCliente(dataArray:any[],fileName:string) {
        let salida = `
        <h1>Lista Clientes</h1>
        <br>
        <table>
            <tr> 
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>CodVivienda</th>
                <th>Pago Impuestos</th>
            </tr>

        `;
        dataArray.forEach(element=>{
            salida += `
                <tr>
                    <td>${element.nombres}</td>
                    <td>${element.apellidos}</td>
                    <td>${element.codVivienda}</td>
                    <td>${element.pagoImpuesto}</td>
                </tr>
            `;
        })
        salida += '</table>'
        return salida;
    }
}