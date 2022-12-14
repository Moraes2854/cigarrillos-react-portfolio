import { useEffect } from 'react';

import { CreateCompras, LoadingSpinner } from '../components';
import { MainLayout } from '../layout/MainLayout';
import { useAppStore } from '../hooks';
import { useLoading } from '../context/LoadingContext';



export const ComprasScreen = () => {
    const { loading } = useLoading();
    
    const {  cigarrillos, cargarCigarrillos } = useAppStore();

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
                                <CreateCompras/>
                            }
                            
                        </div>                            
                    </MainLayout>


                )
            }
        </>   
  )
}
