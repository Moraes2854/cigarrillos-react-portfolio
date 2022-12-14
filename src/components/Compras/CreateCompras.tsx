import React from 'react'
import { Box } from '@mui/material';
import { ComprasDetails, FormCompra } from './';
import { useCompras } from '../../hooks';

export const CreateCompras = () => {

  const { 
    date,
    cantidad,
    selectRef,
    onDateChange,
    onCigarrilloChange,
    onCantidadChange,
    onAddCompraClick,
    saveCompras,

    compras,
    textoCompras,
    totalCompras,
    deleteCompra,
    updateCompraAmount,
    cargarCompras,
  } = useCompras();

  const formCompra = {
    date,
    cantidad,
    selectRef,
    onDateChange,
    onCigarrilloChange,
    onCantidadChange,
    onAddCompraClick,
    saveCompras,
  }
  
  const comprasDetails = {
    compras,
    textoCompras,
    totalCompras,
    deleteCompra,
    updateCompraAmount,
    cargarCompras
  }
  
  return (
    <>
        <FormCompra {...formCompra}/>
        <ComprasDetails {...comprasDetails}/>
    </>
  )
}
