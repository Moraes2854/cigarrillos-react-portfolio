import { MainLayout } from '../layout/MainLayout';
import { useLoading } from '../context/LoadingContext';
import { LoadingSpinner } from '../components';
import { EliminarComprasVentas } from '../components';


export const EliminarComprasVentasByDateScreen = () => {
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
                                
                                <EliminarComprasVentas />
                            }
                        </div>
                    </MainLayout>


                )
            }
        </>   
  )
}






