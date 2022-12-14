import { requestApi }  from '../helpers/handleDB';
import { useAppDispatch } from './hooks';

import { fireErrorToast, fireSuccessToast } from '../helpers/toast';
import { DatoResponse, CreateCigarrilloDto, CreateVentaDto , CreateCompraDto, UpdateCigarrilloDto, UpdateDateByDateDto} from '../interfaces';
import { getErrorMessage } from '../helpers/getErrorMessage';
import { useLoading } from '../context/LoadingContext';


export const useDB = () => {
    const { setLoading } = useLoading(); 
    const dispatch = useAppDispatch();

    const createCigarrillo = async (cigarrillo:CreateCigarrilloDto) => {
        try {
            setLoading(true);

            const response = await requestApi<boolean>('/cigarrillos', 'POST', {...cigarrillo});
            
            setLoading(false);
            
            if (response)
            fireSuccessToast('Cigarrillo creado');
            else 
            fireErrorToast('Error al crear cigarrillo');


            
        } catch (error) {
            setLoading(false);

            fireErrorToast(getErrorMessage(error),);
        }
    }



    const updateSeveralCigarrillos = async(updateSeveralCigarrillos:UpdateCigarrilloDto[]) => {
        try {
            setLoading(true);
            
            const response = await requestApi<boolean>(`/cigarrillos/updateSeveral`, 'PATCH', [...updateSeveralCigarrillos]);
    
            setLoading(false);
    
            if (response)
            fireSuccessToast('Cigarrillos actualizado');
            else 
            fireErrorToast('Error al actualizar cigarrillo');
            
        } catch (error) {
            setLoading(false);
            fireErrorToast(getErrorMessage(error));
        }
    }

    const updateComprasDateByDate = async(updateDateByDateDto:UpdateDateByDateDto) => {
        try {
            setLoading(true);

            const response = await requestApi<boolean>('/compras/updateComprasDateByDate', 'PATCH', {...updateDateByDateDto});
            
            setLoading(false);
    
            if (response)
            fireSuccessToast('Compras actualizadas exitosamente');
            else 
            fireErrorToast('Error al actualizar las compras');
            
        } catch (error) {
            setLoading(false);
            fireErrorToast(getErrorMessage(error));
        }
    }

    const updateVentasDateByDate = async(updateDateByDateDto:UpdateDateByDateDto) => {
        try {
            setLoading(true);

            const response = await requestApi<boolean>('/ventas/updateVentasDateByDate', 'PATCH', {...updateDateByDateDto});
            
            setLoading(false);
    
            if (response)
            fireSuccessToast('Ventas actualizadas exitosamente');
            else 
            fireErrorToast('Error al actualizar las ventas');
            
        } catch (error) {
            setLoading(false);
            fireErrorToast(getErrorMessage(error));
        }
    }

    const createSeveralVentas = async(createVentasDtos:CreateVentaDto[]) => {

        if (createVentasDtos.length < 1) return fireErrorToast('Tiene que haber al menos 1 venta para guardar');
        
        try {
            setLoading(true);

            const response = await requestApi<boolean>('/ventas/createSeveral', 'POST', [...createVentasDtos]);
            
            setLoading(false);
    
            if (response)
            fireSuccessToast('Ventas guardadas exitosamente');
            else 
            fireErrorToast('Error al guardar las ventas');
            
        } catch (error) {
            setLoading(false);
            fireErrorToast(getErrorMessage(error));
        }

    }

    const createSeveralCompras = async(createComprasDtos:CreateCompraDto[]) => {
        if (createComprasDtos.length < 1) return fireErrorToast('Tiene que haber al menos 1 compra para guardar');
    
        try {
            setLoading(true);

            const response = await requestApi<boolean>('/compras/createSeveral', 'POST', [...createComprasDtos]);
            
            setLoading(false);
    
            if (response)
            fireSuccessToast('Compras guardadas exitosamente');
            else 
            fireErrorToast('Error al guardar las compras');
            
        } catch (error) {
            setLoading(false);
            fireErrorToast(getErrorMessage(error));
        }

    }

    const deleteSeveralCompras = async(date:Date) => {
    
        try {
            setLoading(true);

            const response = await requestApi<boolean>('/compras/deleteSeveralComprasByDate', 'POST', {date});
            
            setLoading(false);
    
            if (response)
            fireSuccessToast('Compras eliminadas exitosamente!');
            else 
            fireErrorToast('Error al eliminar las compras');
            
        } catch (error) {
            setLoading(false);
            fireErrorToast(getErrorMessage(error));
        }

    }

    const deleteSeveralVentas = async(date:Date) => {
    
        try {
            setLoading(true);

            const response = await requestApi<boolean>('/ventas/deleteSeveralVentasByDate', 'POST', {date});
            
            setLoading(false);
    
            if (response)
            fireSuccessToast('Ventas eliminadas exitosamente!');
            else 
            fireErrorToast('Error al eliminar las ventas');
            
        } catch (error) {
            setLoading(false);
            fireErrorToast(getErrorMessage(error));
        }

    }


    const consultarDato = async(link:string, type:'GET'|'POST', data:any):Promise<DatoResponse> => {
        
        return new Promise((resolve, reject)=>{
            setLoading(true);
            requestApi<DatoResponse>(`/datos${link}`, type, data)
            .then((response)=>{
                setLoading(false);
                resolve(response);
            })
            .catch((err)=>{
                setLoading(false);
                fireErrorToast(getErrorMessage(err.message));
                reject(err)
            })
        })


    }


    return {
        createCigarrillo,
        updateComprasDateByDate,
        updateVentasDateByDate,
        updateSeveralCigarrillos,
        createSeveralVentas,
        createSeveralCompras,
        deleteSeveralCompras,
        deleteSeveralVentas,

        consultarDato
    }

}
