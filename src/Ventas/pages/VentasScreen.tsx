import { useEffect } from 'react';

import { MainLayout } from '../../common/layout/MainLayout';
import { useAppStore } from '../../common/hooks';
import { VentasTable, FormVenta } from '../components';
import { useVentas } from '../hooks/useVentas';


export const VentasScreen = () => {
    
    const { cargarCigarrillos } = useAppStore();

    const { 
      date,
      addVenta, 
      deleteVenta,
      onCigarrilloChange, 
      onDateChange,
      saveVentas,
      selectRef,
      totalVentas,
      ventas,
      newStock,
      onNewStockChange,
    } = useVentas();
    
    const formVenta =  {
      date,
      selectRef,
      onDateChange,
      onCigarrilloChange,
      addVenta,
      saveVentas,
      newStock,
      onNewStockChange,
      totalVentas,
    }

    useEffect(()=>{
      cargarCigarrillos();
    }, []);

    return (
        <MainLayout>

          <FormVenta {...formVenta}/>
          <VentasTable ventas={ventas} deleteVenta={deleteVenta} /> 

        </MainLayout>

  )
}


