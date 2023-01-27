import { useEffect } from 'react';

import { MainLayout } from '../../common/layout/MainLayout';
import { useAppStore } from '../../common/hooks';
import { useCompras } from '../hooks/useCompras';
import { ComprasDetails, FormCompra } from '../components';



export const ComprasScreen = () => {
    
    const { cigarrillos, cargarCigarrillos } = useAppStore();

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

    useEffect(()=>{
      cargarCigarrillos();
    }, [])

    return (
        <MainLayout>
        
            <FormCompra {...formCompra}/>
            <ComprasDetails {...comprasDetails}/>

        </MainLayout>
     )
}
