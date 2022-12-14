import { useEffect } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { useAppStore } from '../hooks';
import { useLoading } from '../context/LoadingContext';
import { LoadingSpinner, DatosBody } from '../components';




export const DatosScreen = () => {

    const { loading } = useLoading();
    


    return (

        <MainLayout>

            <DatosBody/>
                    
        </MainLayout>
 
  )
}
