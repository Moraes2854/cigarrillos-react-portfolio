import { ComprasVentasSelect } from '../../DeleteComprasVentas/components/CompraVentaSelect';
import { CustomDatePicker } from '../../common/components';
import { useUpdateComprasVentasForm } from '../hooks/useUpdateComprasVentasForm';



export const UpdateComprasVentasForm = () => {

    const {
        currentOption,
        dateToFindObjects,
        newDate,
        onDateToFindObjectsChange,
        onNewDateChange,
        onCompraVentaSelectChange,
        onButtonClick,
        
    } = useUpdateComprasVentasForm();


  return (
    <>
        <div className="mt-2">

            <ComprasVentasSelect onChange={onCompraVentaSelectChange}/>

        </div>


        <div className="mt-2">
            <div className="row">

                <div className="col">
                    <label className='custom-label'>Fecha actual: </label>
                    <CustomDatePicker date={dateToFindObjects} onChange={onDateToFindObjectsChange}/>
                </div>

                <div className="col">
                    <label className='custom-label'>Nueva fecha:</label>
                    <CustomDatePicker date={newDate} onChange={onNewDateChange}/>
                </div>

            </div>
        </div>

        <div className="mt-2 w-100">
            <button 
                className="custom-button guardar-venta"
                onClick={onButtonClick}
            >
            <i className="fa-solid fa-pen pe-2"></i>
                Actualizar {currentOption}                
            </button>
        </div>
           
    </>     

  )
}
