import { useState } from 'react';

import { fireErrorToast, fireSuccessToast } from '../../common/helpers/toast';
import { CreateCigarrilloDto, FormCigarrillo } from '../../common/interfaces';
import { getErrorMessage, requestApi } from '../../common/helpers';
import { useLoading } from '../../common/context/LoadingContext';

const createCigarrillo = async (createCigarrilloDto:CreateCigarrilloDto):Promise<boolean> => {

  const response = await requestApi<boolean>('/cigarrillos', 'POST', {...createCigarrilloDto});
  return response;

}

const initForm = {
  name:'',
  buy_price:0,
  sell_price:0,
}

export const useCreateCigarrillos = () => {

    const [ form, setForm ] = useState<FormCigarrillo>(initForm);
    const { setLoading } = useLoading();

    const handleSubmit = async (e:any)=>{
      e.preventDefault();

      if (form.name.trim() === '') return fireErrorToast('Ingresar un nombre válido');
      if (form.buy_price < 1) return fireErrorToast('Ingresar un precio de compra válido');
      if (form.sell_price < 1) return fireErrorToast('Ingresar un precio de venta válido');
      
      try {

        setLoading(true);
  
        const response = await createCigarrillo(form);

        setLoading(false);
        
        if (response){
          fireSuccessToast('Cigarrillo creado');

          createCigarrillo({
            ...form
          });
          
          setForm(initForm);
        }

        else 
        fireErrorToast('Error al crear cigarrillo');
  
    
      } catch (error) {
        setLoading(false);
        fireErrorToast(getErrorMessage(error));
      }

    }

    const handleFormChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [e.target.name]:(e.target.name !== "name") ? Number(e.target.value.replace(/\D/g, '')) : e.target.value
      });
    }

    const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
      if (e.key === ' '){
        addSpaceToName();
      }
    }

    const addSpaceToName = () => {
      setForm({
        ...form,
        name:form.name+=' '
      })
    }
  
    return {
      ...form,
      handleFormChange,
      handleSubmit,
      onKeyDown,
    }
}
