import { CreateCompraDto } from '../interfaces/compra';
import { Cigarrillo } from '../../common/interfaces/cigarrillo';


export const getComprasFromText = (cigarrillos:Cigarrillo[], text:string, date:string):CreateCompraDto[] => {

    const textFormatted:string = text.replace(/[\r\n]/gm, '') as string;
    const nuevasCompras:CreateCompraDto[] = []; 

    //index es la posicion donde empieza el nombre del cigarrillo en el texto.
    const cigarrillosEnTexto:{index:number, cigarrilloId:string}[] = []; 
    const lineasTexto:string[] = [];
    let indexAnterior=0;


    
    //ACA GUARDAMOS TODOS LOS CIGARRILLOS QUE HAY EN EL TEXTO JUNTO A SU INDEX EN EL TEXTO
    cigarrillos.forEach((cigarrillo)=>{
        if (textFormatted.search(cigarrillo.name)>0){
            cigarrillosEnTexto.push({
              index:textFormatted.search(cigarrillo.name),
              cigarrilloId:cigarrillo.id,
            });
        }
    });

    // SE ORDENA LOS CIGARRILLOS ENCONTRADOS EN EL TEXTO POR SU ORDEN EN EL TEXTO IMPORTANTISIMO!
    cigarrillosEnTexto.sort((a, b) => a.index-b.index);

    // GUARDAMOS LAS LINEAS DE TEXTO
    cigarrillosEnTexto.forEach((currentIndex)=>{
        let linea = "";
        const c = getCigarrilloById(cigarrillos, currentIndex.cigarrilloId);
        if (c){
          // SE EMPIEZA DESDE EL INDEX DEL ULTIMO CIGARRILLO (EL PRIMERO ES 0)
          //INDEX ANTERIOR SERIA DONDE EMPIEZA EL NOMBRE + EL NOMBRE
          for (let i=indexAnterior; i<(currentIndex.index+c.name.length); i++)linea+=textFormatted.charAt(i);
          indexAnterior=currentIndex.index+c.name.length;
          lineasTexto.push(linea);
        }
        linea="";
    });

    lineasTexto.forEach((aux, i)=>{
        let cigarrilloNombre="";
        //[0] = cantidad ----- [1] = Unidades ----- [2] = De ----- [3] = inicio nombre del cigarrillo
        const partes=aux.split(" ");
        const cantidadCigarrilloString = partes[0];
        
        //agarro todo lo que resta a partir de la posicion 3 osea el nombre del cigarrillo
        const arrayNombre = partes.slice(3);

        arrayNombre.forEach((parte)=>{
          cigarrilloNombre+=parte+" "
        });

        cigarrilloNombre=cigarrilloNombre.slice(0, -1);

        const filtro = getCigarrilloByNombre(cigarrillos, cigarrilloNombre);

        if (filtro){
          nuevasCompras.push({
            amount:Number(cantidadCigarrilloString),
            cigarrilloId:filtro.id,
            date
          });
        }
    });


    return nuevasCompras;


}

export const getCigarrilloById = (cigarrillos:Cigarrillo[], id:string):Cigarrillo|undefined => {
    return cigarrillos.find((c)=>c.id === id);
}

export const getCigarrilloByNombre = (cigarrillos:Cigarrillo[], nombre:string):Cigarrillo|undefined => {
    return cigarrillos.find((c)=>c.name === nombre);
}