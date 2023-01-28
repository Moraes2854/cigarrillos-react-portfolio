import { useState, useEffect } from 'react';

import { useAppStore, useFocus } from '../../common/hooks';
import { fireErrorToast, fireSuccessToast } from '../../common/helpers/toast';
import { Cigarrillo } from '../../common/interfaces';
import { CreateVentaDto } from '../interfaces/venta';
import { FormVenta } from '../interfaces/formVenta';
import { getErrorMessage, requestApi } from '../../common/helpers';
import { useLoading } from '../../common/context/LoadingContext';


const createSeveralVentas = async(createVentasDtos:CreateVentaDto[]):Promise<boolean> => {

  const response = await requestApi<boolean>('/ventas/createSeveral', 'POST', [...createVentasDtos]);
  return response;

}

const initForm: FormVenta = {
  date:new Date().toISOString(),
  cigarrilloId:'noid',
  newStock:0
}

export const useVentas = () => {

    const { setLoading } = useLoading();
    const { cigarrillos, selectedCigarrillo, setSelectedCigarrillo, updateCigarrilloLocal } = useAppStore();
    const [selectRef, setFocusSelect] = useFocus();
    const [ventas, setVentas] = useState<CreateVentaDto[]>([]);
    const [totalVentas, setTotalVentas] = useState<number>(0)
  
    const [ form, setForm ] = useState<FormVenta>(initForm);

    const { date, cigarrilloId, newStock } = form;
  
    const addVenta = () => {

      if (selectedCigarrillo){

        if (newStock >= selectedCigarrillo!.stock) {
          return fireErrorToast('El nuevo stock no puede ser mayor o igual al stock anterior');
        }

        const amount = selectedCigarrillo!.stock-newStock;
    
        const venta:CreateVentaDto = {
          amount,
          cigarrilloId,
          date
        }
        
        setVentas([...ventas, venta]);
        


        updateCigarrilloLocal(cigarrilloId, {
          ...selectedCigarrillo,
          stock:newStock
        });
        
        setForm({
          ...form,
          newStock:0
        });
        
        //@ts-ignore
        setFocusSelect();
      
      }

    }
    
    const deleteVenta = (venta:CreateVentaDto) => {
      const cigarrillo = cigarrillos.find((c)=>c.id === venta.cigarrilloId)!;

      // setTotalVentas(totalVentas-(venta.amount*cigarrillo.sell_price));

      updateCigarrilloLocal(venta.cigarrilloId, {
        ...cigarrillo,
        stock:Number(cigarrillo.stock+venta.amount)
      });

      setVentas(ventas.filter((v)=>v!==venta))
    }

    const saveVentas = async()=>{

      if (ventas.length < 1) return fireErrorToast('Tiene que haber al menos 1 venta para guardar');
  
      try {
          setLoading(true);
    
          const response = await createSeveralVentas(ventas);
          
          setLoading(false);
    
          if (response)
          fireSuccessToast('Ventas guardadas exitosamente');
          else 
          fireErrorToast('Error al guardar las ventas');
          
      } catch (error) {
          setLoading(false);
          fireErrorToast(getErrorMessage(error));
      }

      setVentas([]);
    } 
    
    const onCigarrilloChange = (c:Cigarrillo)=>{
      setSelectedCigarrillo(c.id);
      setForm({...form, newStock:0, cigarrilloId:c.id});
    }

    const onDateChange = (date:Date) =>{
     if(date) {
       setForm({
         ...form,
         date:date.toISOString()
       })
     }
    }

    const onNewStockChange = ( e:React.ChangeEvent<HTMLInputElement> ) => {
      setForm({
        ...form,
        newStock:Number(e.target.value.replace(/\D/g, ''))
      })
    }
  
    useEffect(()=>{

      if (cigarrillos.length > 0 ) setSelectedCigarrillo(cigarrillos[0].id);

    }, []);

    useEffect(()=>{
      if (selectedCigarrillo){
        setForm({
          ...form,
          cigarrilloId:selectedCigarrillo!.id
        });
      }
    }, [selectedCigarrillo]);

    useEffect(()=>{
      setTotalVentas(ventas.reduce((acc, obj) => {
        const cigarrillo = cigarrillos.find((c)=>c.id === obj.cigarrilloId)!;
        return acc+(obj.amount*cigarrillo.sell_price);
      }, 0));

    }, [ventas])


    return {
      addVenta,
      deleteVenta,
      saveVentas,
      onCigarrilloChange,
      onDateChange,
      onNewStockChange,

      ...form,
      ventas,
      totalVentas,
      selectRef,
    }
}
