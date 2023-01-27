
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { AuthLayout } from '../../common/layout/AuthLayout';
import { useLoginScreen } from '../hooks/useLoginScreen';




export const LoginScreen = () => {
  
  const {
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    control,
    handleSubmit,
    errors,
    formSubmitHandler
  } = useLoginScreen();



  return (
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
