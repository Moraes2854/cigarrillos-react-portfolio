import { Grid } from '@mui/material';

import { CustomDatePicker, CustomButton, CustomCigarrillosSelect } from '../'
import { useAppStore, useVentas } from '../../hooks';
import { Cigarrillo } from '../../interfaces';




interface Props {
  date:string;
  selectRef:any,
  newStock:number;
  onNewStockChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
  onDateChange:(d:Date)=>void,
  onCigarrilloChange:(c:Cigarrillo)=>void,
  addVenta:()=>void,
  saveVentas:()=>void,
}

export const FormVenta = ({ date, onDateChange, onCigarrilloChange, selectRef, newStock, onNewStockChange, addVenta, saveVentas}:Props) => {
    const { selectedCigarrillo, cigarrillos } = useAppStore();

    return (
      <>
          <div className="mt-2">

              <CustomCigarrillosSelect 
                selectRef={selectRef}
                onChange={onCigarrilloChange} 
                cigarrillos={cigarrillos}
              />

          </div>

          {
            (selectedCigarrillo) &&
            <>
              <div className="mt-2">
                <label className="custom-label">{'Fecha: '}</label>
                <CustomDatePicker 
                  onChange={onDateChange}
                  date={new Date(date)}
                />
              </div>

              <div className="mt-2">
                <label className="custom-label">{(selectedCigarrillo) ? `Stock actual: ${selectedCigarrillo.stock}`: 'Nuevo stock'}</label>
                <input
                  className="form__input"
                  value={newStock}
                  onChange={onNewStockChange}
                  // placeholder={(selectedCigarrillo) ? `Stock actual: ${selectedCigarrillo.stock}`: 'Nuevo stock'} 
                  autoComplete='off'
                  onKeyPress={(e)=>{
                    if (e.key === 'Enter') {
                      addVenta();
                    }
                  }}
                />
              </div>

            
              <div className="row mt-2">

                <div className="col w-100">
                  <button 
                    className="custom-button agregar-venta"
                    onClick={addVenta}
                  >
                    <i className="fa-solid fa-plus pe-2"></i>
                    Agregar venta
                  </button>
                </div>

                <div className="col w-100">
                  <button 
                    className="custom-button guardar-venta"
                    onClick={saveVentas}
                  >
                    <i className="fa-sharp fa-solid fa-floppy-disk pe-2"></i>
                    Guardar ventas                
                  </button>
                </div>


                  

                  
              </div>


              {/* <CustomButton
                title="Agregar venta"
                type="button"
                onClick={addVenta}
              /> */}

              {/* 
                <CustomButton
                  title="Guardar ventas"
                  type="button"
                  onClick={saveVentas}
                /> 
              */}
            
            </>
          }
      </>
  )
}

