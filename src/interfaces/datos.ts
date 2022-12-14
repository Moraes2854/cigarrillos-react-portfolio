import { Cigarrillo } from './cigarrillo';

export interface DatosOption{
    title:string;
    link:string;
    datepickers:0|1|2,
    httpMethod:'GET'|'POST',
    value:number;
}

export interface DatoResponse{
    tableHeader1:string,
    tableHeader2:string,
    data:{tableData1:string, tableData2:string}[],
    caption?:string
}
