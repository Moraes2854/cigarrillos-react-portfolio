import { CustomCigarrillosSelect, CustomDatePicker } from "../../common/components";
import { useAppStore } from "../../common/hooks";
import { Cigarrillo } from "../../common/interfaces";



interface Props {
  date:string;
  cantidad:number;
  selectRef:any;
  onDateChange:(d:Date)=>void;
  onCigarrilloChange:(c:Cigarrillo)=>void;
  onCantidadChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
  onAddCompraClick:()=>void;
  saveCompras:()=>void;
}

export const FormCompra = ({date, cantidad, onCantidadChange, selectRef, onDateChange, onCigarrilloChange, onAddCompraClick, saveCompras}:Props) => {

  const { cigarrillos, selectedCigarrillo } = useAppStore();

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

                  <label className="custom-label">{`Ingresar cantidad compra: (Stock actual ${selectedCigarrillo!.stock})`}</label>

                  <input
                    className="form__input"
                    value={(cantidad>0) ? cantidad : ''}
                    onChange={onCantidadChange}
                    autoComplete='off'
                    onKeyPress={(e)=>{
                      if (e.key === 'Enter') {
                        onAddCompraClick();
                      }
                    }}
                  />
              </div>
              
              <div className="row mt-2">

                <div className="col w-100">
                  <button 
                    className="custom-button agregar-compra"
                    onClick={onAddCompraClick}
                  >
                    <i className="fa-solid fa-plus pe-2"></i>
                    Agregar compra
                  </button>
                </div>

                <div className="col w-100">
                  <button 
                    className="custom-button guardar-compra"
                    onClick={saveCompras}
                  >
                    <i className="fa-sharp fa-solid fa-floppy-disk pe-2"></i>
                    Guardar compras                
                  </button>
                </div>

              </div>
              
            </>
          }
          
      </>
  )
}


