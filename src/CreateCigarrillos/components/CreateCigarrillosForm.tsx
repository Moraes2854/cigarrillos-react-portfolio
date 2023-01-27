import { useCreateCigarrillos } from '../hooks/useCreateCigarrillos';

export const CreateCigarrillosForm = () => {

  const {
    handleSubmit,

    name,
    buy_price,
    sell_price,

    handleFormChange,
    onKeyDown,
  } = useCreateCigarrillos();

  return (
    <form onSubmit={handleSubmit}>

        <div className="mt-2">
          <input
              className="form__input"
              name="name"
              value={name}
              onChange={handleFormChange}
              onKeyDown={onKeyDown}
              placeholder={`Ingresar nombre: `} 
              autoComplete='off'
          />
        </div>

        
        <div className="mt-2">
          <input
              className="form__input"
              name="buy_price"
              value={(buy_price > 0) ? buy_price : ''}
              onChange={handleFormChange}
              placeholder={`Ingresar precio de compra: $`} 
              autoComplete='off'
          />
        </div>

        
        <div className="mt-2">
          <input
              className="form__input"
              name="sell_price"
              value={(sell_price > 0 ) ? sell_price : ''}
              onChange={handleFormChange}
              placeholder={`Ingresar precio de venta: $`} 
              autoComplete='off'
          />
        </div>

        <div className="mt-2">
            <button 
              className="custom-button guardar-cigarrillo"
              type="submit"
            >
              <i className="fa-sharp fa-solid fa-floppy-disk pe-2"></i>
              Guardar cigarrillo                
            </button>
        </div>  

    </form>

  )
}
