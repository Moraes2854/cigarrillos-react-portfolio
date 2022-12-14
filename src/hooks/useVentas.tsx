import { useState, useEffect } from 'react';

import { useAppStore, useDB, useFocus } from '.';
import { CreateVentaDto, FormVenta, Cigarrillo } from '../interfaces';



export const useVentas = () => {

    const { cigarrillos, selectedCigarrillo, setSelectedCigarrillo, updateCigarrilloLocal } = useAppStore();
    const { createSeveralVentas } = useDB(); 
    const [selectRef, setFocusSelect] = useFocus();
    const [ventas, setVentas] = useState<CreateVentaDto[]>([]);
    const [totalVentas, setTotalVentas] = useState<number>(0)
  
    const [form, setForm] = useState<FormVenta>({
      date:new Date().toISOString(),
      cigarrilloId:cigarrillos.at(0)!.id,
      newStock:0
    });

    const { date, cigarrilloId, newStock } = form;
  
    const addVenta = () => {
        if (selectedCigarrillo){
  
          if (newStock >= selectedCigarrillo!.stock) throw new Error('El nuevo no puede ser mayor o igual al anterior');
  
          const amount = selectedCigarrillo!.stock-newStock;
      
          const venta:CreateVentaDto = {
            amount,
            cigarrilloId,
            date
          }
          
          setVentas([...ventas, venta]);
          
          setTotalVentas(totalVentas+(amount*selectedCigarrillo.sell_price));


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

      setTotalVentas(totalVentas-(venta.amount*cigarrillo.sell_price));

      updateCigarrilloLocal(venta.cigarrilloId, {
        ...cigarrillo,
        stock:Number(cigarrillo.stock+venta.amount)
      });

      setVentas(ventas.filter((v)=>v!==venta))
    }

    const saveVentas = ()=>{
      createSeveralVentas(ventas);
      setVentas([]);
      setTotalVentas(0);
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
      setSelectedCigarrillo(cigarrillos[0].id);
    }, []);

    useEffect(()=>{
      if (selectedCigarrillo){
        setForm({
          ...form,
          cigarrilloId:selectedCigarrillo!.id
        });
      }
    }, [selectedCigarrillo]);


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
