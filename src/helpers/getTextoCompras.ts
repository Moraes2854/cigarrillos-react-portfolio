import { CreateCompraDto, Cigarrillo } from '../interfaces';

export const getTextoCompras = (compras:CreateCompraDto[], cigarrillos:Cigarrillo[]) => {

    let texto = "";
    compras.forEach((compra) => {
      const cigarrillo = cigarrillos.find((c)=>c.id === compra.cigarrilloId)!;
      texto += `${compra.amount} Unidades de ${cigarrillo.name}\n`;
    });

    return texto;
}