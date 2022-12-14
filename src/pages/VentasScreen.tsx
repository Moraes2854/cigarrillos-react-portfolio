import { useEffect } from 'react';

import { MainLayout } from '../layout/MainLayout';
import { useAppStore } from '../hooks';
import { useLoading } from '../context/LoadingContext';
import { CreateVentas, LoadingSpinner } from '../components';


export const VentasScreen = () => {
    const { loading } = useLoading();
    
    const { cigarrillos, cargarCigarrillos } = useAppStore();

    useEffect(()=>{
      cargarCigarrillos();
    }, [])

    return (
        <>
            {
                (loading) ? <LoadingSpinner/>
                :
                (
                    <MainLayout>
                        <div className="w-100">
                        { 
                            (cigarrillos.length > 0 ) && 
                            <CreateVentas/>
                        }
                        </div>                            
                    </MainLayout>

                )
            }
        </>   
  )
}


