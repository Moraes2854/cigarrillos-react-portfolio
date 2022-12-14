import { MainLayout } from '../layout/MainLayout';
import { useLoading } from '../context/LoadingContext';
import { LoadingSpinner, UpdateComprasVentas } from '../components';

export const ActualizarComprasVentasByDateScreen = () => {

    const { loading } = useLoading();


    return (
        <>
            {
                (loading) ? <LoadingSpinner/>
                :
                (
                    <MainLayout>
                        <div className="w-100">
                            { 
                                
                                <UpdateComprasVentas />
                            }
                        </div>
                    </MainLayout>


                )
            }
        </>   
  )

}
