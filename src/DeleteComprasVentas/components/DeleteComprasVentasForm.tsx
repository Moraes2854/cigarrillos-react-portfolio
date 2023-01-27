import { CustomDatePicker } from "../../common/components";
import { useDeleteComprasVentasForm } from "../hooks/useDeleteComprasVentasForm";
import { ComprasVentasSelect } from "./CompraVentaSelect";

export const DeleteComprasVentasForm = () => {
    
    const {
        currentOption,
        date,
        onComprasVentasSelectChange,
        onDateChange,
        onDeleteButtonClick
    } = useDeleteComprasVentasForm();


  return (
    <>
        <div className="mt-2">

            <ComprasVentasSelect onChange={onComprasVentasSelectChange} />

        </div>

        <div className="mt-2">
            <label className="custom-label">{'Fecha: '}</label>

            <CustomDatePicker 
                onChange={onDateChange}
                date={new Date(date)}
            />
        </div>

        <div className="mt-2 w-100">
            <button 
                className="custom-button guardar-venta"
                onClick={onDeleteButtonClick}
            >
            <i className="fa-solid fa-trash pe-2"></i>
                Eliminar {currentOption}                
            </button>
        </div>
           
    </>     

  )
}
