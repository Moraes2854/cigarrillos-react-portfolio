import { useState } from 'react';

import { useDB } from '.';
import { FormCigarrillo } from '../interfaces';
import { fireErrorToast } from '../helpers/toast';


const initForm = {
  name:'',
  buy_price:0,
  sell_price:0,
}

export const useCreateCigarrillos = () => {

    const [form, setForm] = useState<FormCigarrillo>(initForm);

    const { createCigarrillo } = useDB(); 

    const handleSubmit = (e:any)=>{
      e.preventDefault();

      if (form.name.trim() === '') return fireErrorToast('Ingresar un nombre válido');
      if (form.buy_price < 1) return fireErrorToast('Ingresar un precio de compra válido');
      if (form.sell_price < 1) return fireErrorToast('Ingresar un precio de venta válido');

      createCigarrillo({
        ...form
      });
      
      setForm(initForm);
      
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
