import React, { useEffect, useState } from 'react'
import { Tooltip, IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';


import { Cigarrillo } from '../../common/interfaces/cigarrillo';
import { useAppStore } from '../../common/hooks';
import { Compra, CreateCompraDto } from '../interfaces';



interface Props{
    compras:CreateCompraDto[]|Compra[],
    deleteCompra:(compra:CreateCompraDto)=>void,
    updateCompraAmount:(cigarrilloId:string, newAmount:number)=>void;
}

export const ComprasTable = ({compras, deleteCompra, updateCompraAmount}:Props) => {

  return (
    <div className="table-responsive">
        <table className="table table-dark table-striped table-bordered border-dark align-middle text-center mt-2">
            <thead>
                <tr>
                    <th scope="col">Cigarrillo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio compra</th>
                    <th scope="col">Total</th>
                    <th scope="col">Eliminar</th>
                </tr>
            </thead>
            <tbody>
                    <TableCompraDto 
                        compras={compras} 
                        deleteCompra={deleteCompra} 
                        updateCompraAmount={updateCompraAmount}
                    />
            </tbody>
        </table>
    </div>

  )
}

const TableCompraDto = ({compras, deleteCompra, updateCompraAmount}:Props)=>{
    
    const { cigarrillos } = useAppStore();

    return (
        <>
            {
                compras.map((compra)=>{
                    const cigarrillo = cigarrillos.find((c)=>c.id === compra.cigarrilloId)!;
                    return (
                        <TableRow 
                            compra={compra} 
                            cigarrillo={cigarrillo} 
                            deleteCompra={deleteCompra}
                            updateCompraAmount={updateCompraAmount}
                            key={`comprarow${compra.cigarrilloId}`}
                        />
                    )
                })
            }
        </>
    )
}

interface RowProps{
    compra:CreateCompraDto; 
    cigarrillo:Cigarrillo;
    deleteCompra:(compra:CreateCompraDto)=>void,
    updateCompraAmount:(cigarrilloId:string, newAmount:number)=>void;
}

const TableRow = ({compra, cigarrillo, deleteCompra, updateCompraAmount}:RowProps) => {

    const inputRef = React.useRef<HTMLInputElement>(null);
    
    const [showInput, setShowInput] = useState(false);
    const [newAmount, setNewAmount] = useState(compra.amount);

    useEffect(()=>{
        if (inputRef.current) if (showInput) inputRef.current.focus();
    }, [showInput])

    return (
        <tr>
            <Tooltip title={cigarrillo.name} placement="top-start">
                <td style={{maxWidth:'125px'}}>{cigarrillo.name}</td>
            </Tooltip>
            <td 
                onDoubleClick={()=>{setShowInput(true)}}
            >
                {
                    (showInput) ?
                    <input 
                        ref={inputRef}
                        type="text" 
                        // className={`form-control ${!isTitleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="newAmount"
                        autoComplete="off"
                        key={`newAmountInput${cigarrillo.id}`}
                        value={newAmount}
                        onChange={({target})=>{
                            setNewAmount(Number(target.value.replace(/\D/g, "")));
                        }}
                        onKeyDownCapture={(e)=>{
                            if (e.key === 'Enter'){
                                setShowInput(false);
                                updateCompraAmount(cigarrillo.id, newAmount)
                            }                                
                        }}

                        />
                    :
                    <>{compra.amount}</>
                }
            </td>
            <td>{`$${cigarrillo.buy_price}`}</td>
            <td>{`$${cigarrillo.buy_price * compra.amount}`}</td>
            <td>
                <IconButton
                    color='error'
                    onClick={()=>{deleteCompra(compra)}}
                >
                    <DeleteOutline/>
                </IconButton>
            </td>
        </tr>
    )
}
