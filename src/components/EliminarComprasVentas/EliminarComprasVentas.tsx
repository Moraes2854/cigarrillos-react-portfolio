import { useState } from 'react'
import Swal from 'sweetalert2';
import { ComprasVentasSelect, CompraVentaOptionType, CustomDatePicker } from '..';
import { useDB } from '../../hooks';

export const EliminarComprasVentas = () => {

    const [currentOption, setCurrentOption] = useState<CompraVentaOptionType>('COMPRAS');
    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

    const { deleteSeveralCompras, deleteSeveralVentas } = useDB();


  return (
    <>
        <div className="mt-2">

            <ComprasVentasSelect 
                onChange={(opt)=>{setCurrentOption(opt)}} 
            />

        </div>

        <div className="mt-2">
            <label className="custom-label">{'Fecha: '}</label>

            <CustomDatePicker 
                onChange={(d)=>{setDate(d)}}
                date={new Date(date)}
            />
        </div>

        <div className="mt-2 w-100">
            <button 
                className="custom-button guardar-venta"
                onClick={async()=>{
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
                        if (currentOption === 'COMPRAS'){
                            deleteSeveralCompras(date);
                        }
                        if (currentOption === 'VENTAS'){
                            deleteSeveralVentas(date);
                        }
                    }

                }}
            >
            <i className="fa-solid fa-trash pe-2"></i>
                Eliminar {currentOption}                
            </button>
        </div>
           
    </>     

  )
}
