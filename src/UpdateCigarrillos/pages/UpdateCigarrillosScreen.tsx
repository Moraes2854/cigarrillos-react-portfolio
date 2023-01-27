import { useEffect } from 'react';

import { MainLayout } from '../../common/layout/MainLayout';
import { useAppStore } from '../../common/hooks';
import { UpdateCigarrillosForm } from '../components/UpdateCigarrillosForm';


export const UpdateCigarrillosScreen = () => {
    
    const { cargarCigarrillos } = useAppStore();

    useEffect(()=>{
      cargarCigarrillos();
    }, [])

    return (

        <MainLayout>

            <UpdateCigarrillosForm />

        </MainLayout>

  )
}


