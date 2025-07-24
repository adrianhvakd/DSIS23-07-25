import * as FPDF from 'node-fpdf'
import * as path from 'path';
import { Reporte } from './reporte';
export class printPDF implements Reporte{
    pdf:any
    constructor(){
        this.pdf = new FPDF('P','cm','Letter');
    }
    generarReportCliente(data:any[],namefile){
        this.pdf.AddPage();
        this.pdf.SetFont('Arial','B',16);
        this.pdf.Cell(18,1,"Lista de Clientes",0,1,'C');

        const imagePath = path.join(__dirname, '..', '..', 'reports', 'aea.png');
        this.pdf.Image(imagePath, 19, 0, -900);

        this.pdf.SetFont('Arial','B',12);
        this.pdf.Cell(5,1,"Nombres",1,0,'C');
        this.pdf.Cell(5,1,"Apellidos",1,0,'C');
        this.pdf.Cell(5,1,"Cod Catastral",1,0,'C');
        this.pdf.Cell(4,1,"Pago Impuesto",1,1,'C');

        this.pdf.SetFont('Arial','',12);
        data.forEach(element => {
            this.pdf.Cell(5,1,element.nombres,1,0,'C');
            this.pdf.Cell(5,1,element.apellidos,1,0,'C');
            this.pdf.Cell(5,1,element.codVivienda,1,0,'C');
            this.pdf.Cell(4,1,element.pagoImpuesto?'SI':'NO',1,1,'C');
        });

        this.pdf.Output('F',`reports/${namefile}`);
    }
}