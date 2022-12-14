import React from 'react'
import { UpdateCigarrilloDto } from '../../interfaces';
import { Tooltip, IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

interface Props{
    cigarrillosToUpdate:UpdateCigarrilloDto[],
    deleteCigarrilloToUpdate:(id:string)=>void;
}

export const CigarrillosToUpdateTable = ({cigarrillosToUpdate, deleteCigarrilloToUpdate}:Props) => {

    return (
        <div className="table-responsive">
            <table className="table table-dark table-striped table-bordered border-dark align-middle text-center mt-2">
                <thead>
                    <tr>
                        <th scope="col">Cigarrillo</th>
                        <th scope="col">Precio compra</th>
                        <th scope="col">Precio venta</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <TableCigarrilloDto cigarrillosToUpdate={cigarrillosToUpdate} deleteCigarrilloToUpdate={deleteCigarrilloToUpdate}/>
                </tbody>
            </table>
        </div>
    
    )

}

const TableCigarrilloDto = ({cigarrillosToUpdate, deleteCigarrilloToUpdate}:Props)=>{
    return (
        <>
            {
                cigarrillosToUpdate.map((cigarrillo)=>(
                    <tr key={`${cigarrillo.id}tablekey`}>
                        <Tooltip title={cigarrillo.name!} placement="top-start">
                            <td style={{maxWidth:'125px'}}>{cigarrillo.name}</td>
                        </Tooltip>
                        <td>{`$${cigarrillo.buy_price}`}</td>
                        <td>{`$${cigarrillo.sell_price}`}</td>
                        <td>
                            <IconButton
                                color='error'
                                onClick={()=>{deleteCigarrilloToUpdate(cigarrillo.id)}}
                            >
                                <DeleteOutline/>
                        </IconButton>
                        </td>
                    </tr>
                ))
            }
        </>
    )
    
}
