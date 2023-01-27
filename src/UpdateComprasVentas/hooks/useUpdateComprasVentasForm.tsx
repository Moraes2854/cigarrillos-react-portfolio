import { useState } from 'react'
import Swal from 'sweetalert2';
import { fireErrorToast, fireSuccessToast, getErrorMessage, requestApi } from '../../common/helpers';
import { UpdateDateByDateDto } from '../../common/interfaces';
import { useLoading } from '../../common/context/LoadingContext';
import { CompraVentaOptionType } from '../../DeleteComprasVentas/components/CompraVentaSelect';


const updateSeveral = async(type:CompraVentaOptionType, updateDateByDateDto:UpdateDateByDateDto) => {
    const url = (type === 'COMPRAS') ? '/compras/deleteSeveralComprasByDate' : '/ventas/deleteSeveralVentasByDate';
    const response = await requestApi<boolean>( url, 'PATCH', {...updateDateByDateDto});
    return response;
}

export const useUpdateComprasVentasForm = () => {
    const { setLoading } = useLoading();
    const [ currentOption, setCurrentOption ] = useState<CompraVentaOptionType>('COMPRAS');
    const [ dateToFindObjects, setDateToFindObjects ] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
    const  [newDate, setNewDate ] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

    const onDateToFindObjectsChange = (date:Date)=>{
        setDateToFindObjects(date)
    };

    const onNewDateChange = (date:Date) => {
        setNewDate(date);
    }

    const onCompraVentaSelectChange = (opt:CompraVentaOptionType)=>{
        setCurrentOption(opt)
    };

    const onButtonClick = async()=>{
        const { value: accept } = await Swal.fire({
            title: `Actualizar ${currentOption.toLocaleLowerCase()}`,
            input: 'checkbox',
            inputValue: 0,
            inputPlaceholder:
              'Seleccionar para actualizar',
            confirmButtonText:
              'Continuar <i class="fa fa-arrow-right"></i>',
          })
          
        if (accept) {
            try {
                setLoading(true);
                const response = await updateSeveral(currentOption, {dateToFindObjects, newDate});
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
        dateToFindObjects,
        newDate,
        onDateToFindObjectsChange,
        onNewDateChange,
        onCompraVentaSelectChange,
        onButtonClick,
        
    }
}
