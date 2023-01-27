import { useState } from 'react'
import Swal from 'sweetalert2';

import { fireErrorToast, fireSuccessToast, getErrorMessage, requestApi } from '../../common/helpers';
import { useLoading } from '../../common/context/LoadingContext';
import { CompraVentaOptionType } from '../components/CompraVentaSelect';


const deleteSeveral = async(type:CompraVentaOptionType, date:Date) => {
    const url = (type === 'COMPRAS') ? '/compras/deleteSeveralComprasByDate' : '/ventas/deleteSeveralVentasByDate';
    const response = await requestApi<boolean>( url, 'POST', { date } );
    return response;
}

export const useDeleteComprasVentasForm = () => {
    
    const { setLoading } = useLoading();
    const [ currentOption, setCurrentOption ] = useState<CompraVentaOptionType>('COMPRAS');
    const [ date, setDate ] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

    const onComprasVentasSelectChange = (opt:CompraVentaOptionType) => {
        setCurrentOption(opt)
    };

    const onDateChange = (d:Date)=> {
        setDate(d);
    }

    const onDeleteButtonClick = async()=>{
        const { value: accept } = await Swal.fire({
            title: `Eliminar ${currentOption.toLocaleLowerCase()}`,
            input: 'checkbox',
            inputValue: 0,
            inputPlaceholder:
              'Seleccionar para eliminar',
            confirmButtonText:
              'Continuar <i class="fa fa-arrow-right"></i>',
          })
          
        if (accept) {

            try {
                setLoading(true);
                const response = await deleteSeveral(currentOption, date);
                if (response)
                fireSuccessToast(`${currentOption} eliminadas exitosamente!`);
                else 
                fireErrorToast(`Error al eliminar las ${currentOption}`);
            } catch (error) {
                setLoading(false);
                fireErrorToast(getErrorMessage(error));
            }

        }

    };


    return {
        currentOption,
        date,
        onComprasVentasSelectChange,
        onDateChange,
        onDeleteButtonClick,
    }
}
