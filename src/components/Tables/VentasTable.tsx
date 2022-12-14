import { Tooltip, IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

import { CreateVentaDto, Venta } from '../../interfaces/venta';
import { useAppStore } from '../../hooks';

import './Table.css';

interface Props{
    ventas:CreateVentaDto[]|Venta[],
    deleteVenta:(venta:CreateVentaDto)=>void,
}

export const VentasTable = ({ventas, deleteVenta}:Props) => {

  return (
    <div className="table-responsive">
        <table className="table table-dark table-striped table-bordered border-dark align-middle text-center mt-2">
            <thead>
                <tr>
                    <th scope="col">Cigarrillo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio venta</th>
                    <th scope="col">Total</th>
                    <th scope="col">Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <TableVentaDto ventas={ventas} deleteVenta={ deleteVenta }/>
            </tbody>
        </table>
    </div>
  )

}

const TableVentaDto = ({ventas, deleteVenta}:Props)=>{
    
    const { cigarrillos } = useAppStore();


    return (
        <>
            {
                ventas.map((venta)=>{
                    const cigarrillo = cigarrillos.find((c)=>c.id === venta.cigarrilloId)!;

                    return(
                        <tr key={`${Math.random()}`}>
                            <Tooltip title={cigarrillo.name} placement="top-start">
                                <td style={{maxWidth:'125px'}}>{cigarrillo.name}</td>
                            </Tooltip>
                            <td>{venta.amount}</td>
                            <td>{`$${cigarrillo.sell_price}`}</td>
                            <td>{`$${cigarrillo.sell_price * venta.amount}`}</td>
                            <td>
                                <IconButton
                                    color='error'
                                    onClick={()=>{deleteVenta(venta)}}
                                >
                                    <DeleteOutline/>
                                </IconButton>
                            </td>
                        </tr>
                )})
            }
        </>
    )
}