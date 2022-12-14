import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { useAppStore, useAuthStore } from '../hooks';
import { LoadingSpinner } from '../components';
import { useLoading } from '../context/LoadingContext';

interface FormLogin{
  email:string,
  password:string,
}

const schema = yup.object().shape({
  email:yup.string().email().required().typeError('Debe ingresar un email válido'),
  password:yup.string().required().typeError('Debe ingresar una contraseña')
});

export const LoginScreen = () => {
  const { loading } = useLoading();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const { startLogin } = useAuthStore();

  const { control, handleSubmit, formState: { errors } } = useForm<FormLogin>({resolver:yupResolver(schema)});

  const formSubmitHandler: SubmitHandler<FormLogin> = ({email, password}:FormLogin)=>{
    startLogin({email, password});
  }


  return (
    <>
      {
        (loading) ? <LoadingSpinner/>
        :
        (
          <AuthLayout title="Login">
                <form onSubmit={handleSubmit(formSubmitHandler)}>
                    <Grid container>
                      <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue={''}
                            render={({ field })=> (
                              <TextField
                                {...field}
                                error={!!errors.email}
                                helperText={errors.email ? errors.email?.message: ''}
                                placeholder='Email' 
                                label="Email" 
                                type="text" 
                                fullWidth
                                sx={{zIndex:0}}
                                color="secondary"
                                autoComplete="off"
                              />
                            )}  
                          />
                      </Grid>

                      <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue={''}
                            render={({ field })=> (
                              <TextField
                                {...field}
                                error={!!errors.password}
                                helperText={errors.password ? errors.password?.message: ''}
                                placeholder='Contraseña' 
                                label="Contraseña" 
                                type={showPassword ? "text" : "password"} 
                                fullWidth
                                sx={{zIndex:0}}
                                color="secondary"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                      >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }}
                              />
                            )}  
                          />
                      </Grid>
                      
                      <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={ 12 } sm={ 12 }>
                          <Button variant='contained' fullWidth color="secondary" sx={{color:'white'}} type="submit">
                            Login
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>

              </AuthLayout>
        )
      }
    </>
  )
}
