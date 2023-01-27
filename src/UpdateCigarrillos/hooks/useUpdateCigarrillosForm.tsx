import { useState, useEffect } from 'react';

import { fireErrorToast, fireSuccessToast } from '../../common/helpers/toast';
import { Cigarrillo, FormCigarrillo, UpdateCigarrilloDto } from '../../common/interfaces';
import { useAppStore, useFocus } from '../../common/hooks';
import { getErrorMessage, requestApi } from '../../common/helpers';
import { useLoading } from '../../common/context/LoadingContext';

const updateSeveralCigarrillos = async( updateSeveralCigarrillos:UpdateCigarrilloDto[] ):Promise<boolean> => {
  
  const response = await requestApi<boolean>(`/cigarrillos/updateSeveral`, 'PATCH', [...updateSeveralCigarrillos]);
  return response;

}

export const useUpdateCigarrillosForm = () => {
  
    const { setLoading } = useLoading();

    const [cigarrillosToUpdate, setCigarrillosToUpdate] = useState<UpdateCigarrilloDto[]>([]);


    const [form, setForm] = useState<FormCigarrillo>({
      name:'',
      buy_price:0,
      sell_price:0,
    });


    const { cigarrillos, selectedCigarrillo, setSelectedCigarrillo, updateCigarrillos } = useAppStore();
    const [selectRef, setFocusSelect] = useFocus();

    const handleSubmit = (e:any)=>{
      e.preventDefault();

      if (selectedCigarrillo){

        const initialForm:FormCigarrillo = {
          name:selectedCigarrillo.name, 
          buy_price:selectedCigarrillo.buy_price, 
          sell_price:selectedCigarrillo.sell_price 
        }

        if (form.name.trim() === '') return fireErrorToast('Ingresar un nombre válido');
        if (form.buy_price < 1) return fireErrorToast('Ingresar un precio de compra válido');
        if (form.sell_price < 1) return fireErrorToast('Ingresar un precio de venta válido');
        
        if (form.name === initialForm.name && form.buy_price === initialForm.buy_price && form.sell_price === initialForm.sell_price)
        return fireErrorToast('Se necesita al menos un cambio para actualizar el cigarrillo');
        
        setCigarrillosToUpdate([
          ...cigarrillosToUpdate,
          {
            ...form,
            id:selectedCigarrillo.id,
            stock:selectedCigarrillo.stock,
          }
        ])

        //@ts-ignore
        setFocusSelect();
      }
      
    }

    const handleFormChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [e.target.name]:(e.target.name !== "name") ? Number(e.target.value.replace(/\D/g, '')) : e.target.value
      });
    }
    
    const deleteCigarrilloToUpdate = (cigarrilloId:string) => {
      setCigarrillosToUpdate(
        cigarrillosToUpdate.filter((c)=>c.id!==cigarrilloId)
      )
    }

    const onCigarrilloChange = (c:Cigarrillo)=>{
      setSelectedCigarrillo(c.id);
    }

    const saveUpdates = async() => {
      
      if (cigarrillosToUpdate.length<1) return fireErrorToast('Se necesita al menos un cambio para realizar la actualización');
      
      try {
        
        setLoading(true);

        const response = await updateSeveralCigarrillos(cigarrillosToUpdate);

        setLoading(false);
    
        if (response){
          fireSuccessToast('Cigarrillos actualizado');

          const newCigarrillosLocal:Cigarrillo[] = cigarrillos.map((c)=>{
            const cigarrilloToInclude = cigarrillosToUpdate.find((cToInclude)=>cToInclude.id === c.id);
            return (cigarrilloToInclude) ? { ...c, ...cigarrilloToInclude} : c
          })
    
          updateCigarrillos(
            newCigarrillosLocal
          )
        }

        else 
        fireErrorToast('Error al actualizar cigarrillo');

      } catch (error) {

        setLoading(false);
        fireErrorToast(getErrorMessage(error));

      }

    }

    useEffect(()=>{
      setSelectedCigarrillo(cigarrillos[0].id);
    }, []);

    useEffect(()=>{
      if (selectedCigarrillo){
        setForm({
          name:selectedCigarrillo.name,
          buy_price: Number(selectedCigarrillo.buy_price),
          sell_price: Number(selectedCigarrillo.sell_price),
        })

      }
    }, [selectedCigarrillo])


    return {
      cigarrillosToUpdate,
      onCigarrilloChange,
      deleteCigarrilloToUpdate,

      ...form,
      handleSubmit,
      handleFormChange,
      saveUpdates,
      selectRef,
    }
}
