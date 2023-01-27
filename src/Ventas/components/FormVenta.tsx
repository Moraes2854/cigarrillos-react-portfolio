import { Cigarrillo } from '../../common/interfaces';
import { useAppStore } from '../../common/hooks';
import { CustomCigarrillosSelect, CustomDatePicker } from '../../common/components';


interface Props {
  addVenta:()=>void,
  date:string;
  newStock:number;
  onCigarrilloChange:(c:Cigarrillo)=>void,
  onDateChange:(d:Date)=>void,
  onNewStockChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
  saveVentas:()=>void,
  selectRef:any,
  totalVentas:number;
}

export const FormVenta = ({ date, onDateChange, onCigarrilloChange, selectRef, newStock, onNewStockChange, addVenta, saveVentas, totalVentas }:Props) => {

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

            </>
          }

          <div className="mt-2">
            <input
              className="form__input"
              value={`Total ventas: $${totalVentas}`}
              placeholder={`Total ventas: $`} 
              disabled={true}
            />
          </div>
      </>
  )
}

