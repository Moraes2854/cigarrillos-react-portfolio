import { Grid, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import { useLoading } from '../context/LoadingContext';
import { LoadingSpinner } from '../components';

import 'react-toastify/dist/ReactToastify.css';

interface Props{
  children:any,
  title:string
}

export const AuthLayout = ({ children, title }:Props) => {

  const { loading } = useLoading();

  return (
    
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'secondary.main', padding: 4 }}
    >
      {
        ( loading ) ? <LoadingSpinner />
        : (

            <Grid item
              className='box-shadow'
              xs={ 3 }
              sx={{ 
                width: { sm: 450 },
                backgroundColor: 'white', 
                padding: 3, 
                borderRadius: 2 
              }}
            >
              
              <Typography variant='h5' sx={{ mb: 1 }} textAlign="center">{ title }</Typography>

              {
                (loading) ? <LoadingSpinner />
                : children              
              }
                
            </Grid>
        )
      }


        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </Grid>

  )
}
