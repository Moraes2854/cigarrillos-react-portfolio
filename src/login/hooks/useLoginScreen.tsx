import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { useAuthStore } from '../../common/hooks';

interface FormLogin{
    email:string,
    password:string,
  }
  
const schema = yup.object().shape({
    email:yup.string().email().required().typeError('Debe ingresar un email válido'),
    password:yup.string().required().typeError('Debe ingresar una contraseña')
});

export const useLoginScreen = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
  
    const { startLogin } = useAuthStore();
  
    const { control, handleSubmit, formState: { errors } } = useForm<FormLogin>({resolver:yupResolver(schema)});
  
    const formSubmitHandler: SubmitHandler<FormLogin> = ({email, password}:FormLogin)=>{
      startLogin({email, password});
    }

    return {
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        control,
        handleSubmit,
        errors,
        formSubmitHandler
    }


}
