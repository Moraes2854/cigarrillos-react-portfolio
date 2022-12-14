
import { FormVenta } from './';
import { VentasTable } from '../';
import { useVentas } from '../../hooks/useVentas';

export const CreateVentas = () => {
  
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



  return (
    <>
        <FormVenta {...formVenta}/>

        <div className="mt-2">
          <input
            className="form__input"
            value={`Total ventas: $${totalVentas}`}
            placeholder={`Total ventas: $`} 
            disabled={true}
          />
        </div>
              
        <VentasTable ventas={ventas} deleteVenta={deleteVenta} /> 
    </>
  )
}
