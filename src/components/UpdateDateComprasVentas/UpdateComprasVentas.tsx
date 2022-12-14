import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { ComprasVentasSelect, CompraVentaOptionType, CustomDatePicker } from '..';
import { useDB } from '../../hooks';

export const UpdateComprasVentas = () => {

    const [currentOption, setCurrentOption] = useState<CompraVentaOptionType>('COMPRAS');
    const [dateToFindObjects, setDateToFindObjects] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
    const [newDate, setNewDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

    const { updateComprasDateByDate, updateVentasDateByDate } = useDB();


  return (
    <>
        <div className="mt-2">

            <ComprasVentasSelect 
                onChange={(opt)=>{setCurrentOption(opt)}} 
            />

        </div>


        <div className="mt-2">
            <div className="row">

                <div className="col">
                    <label className='custom-label'>Fecha actual: </label>
                    <CustomDatePicker date={dateToFindObjects} onChange={(date)=>{setDateToFindObjects(date)}}/>
                </div>

                <div className="col">
                    <label className='custom-label'>Nueva fecha:</label>
                    <CustomDatePicker date={newDate} onChange={(date)=>{setNewDate(date)}}/>
                </div>

            </div>
        </div>

        <div className="mt-2 w-100">
            <button 
                className="custom-button guardar-venta"
                onClick={async()=>{
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
                        if (currentOption === 'COMPRAS'){
                            updateComprasDateByDate({dateToFindObjects, newDate});
                        }
                        if (currentOption === 'VENTAS'){
                            updateVentasDateByDate({dateToFindObjects, newDate});
                        }
                    }

                }}
            >
            <i className="fa-solid fa-pen pe-2"></i>
                Actualizar {currentOption}                
            </button>
        </div>
           
    </>     

  )
}
