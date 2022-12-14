import { CustomCigarrillosSelect } from '../';
import { useAppStore, useUpdateCigarrillos } from '../../hooks';
import { CigarrillosToUpdateTable } from '../Tables/CigarrillosToUpdateTable';

export const UpdateCigarrillos = () => {
    const { selectedCigarrillo, cigarrillos } = useAppStore();
    const { 
        onCigarrilloChange,
        name,
        buy_price,
        sell_price,
        handleSubmit,
        handleFormChange,
        saveUpdates,
        selectRef,

        cigarrillosToUpdate,
        deleteCigarrilloToUpdate,
     } = useUpdateCigarrillos();


  return (
    <form onSubmit={handleSubmit}>

        <div className="mt-2">
            <CustomCigarrillosSelect 
                selectRef={selectRef}
                onChange={onCigarrilloChange} 
                cigarrillos={cigarrillos}
            />

        </div>

        {
            (selectedCigarrillo) &&
            (
                <>
                    <div className="mt-2">
                        <label className="custom-label">{`Nombre actual: ${selectedCigarrillo.name}`}</label>

                        <input
                            className="form__input"
                            name="name"
                            value={name}

                            onChange={handleFormChange}
                        />
                    </div>
            
                    <div className="mt-2">
                        <label className="custom-label">{`Precio de compra actual: ${selectedCigarrillo.buy_price}`}</label>

                        <input
                            className="form__input"
                            name="buy_price"
                            value={buy_price}
                            onChange={handleFormChange}
                        />
                        
                    </div>
            
                    <div className="mt-2">

                        <label className="custom-label">{`Precio de venta actual: ${selectedCigarrillo.sell_price}`}</label>

                        <input
                            className="form__input"
                            name="sell_price"
                            value={sell_price}
                            onChange={handleFormChange}
                        />

                    </div>

                    <div className="mt-2">
                        <button 
                            className="custom-button guardar-cigarrillo"
                            onClick={handleSubmit}
                        >
                            <i className="fa-sharp fa-solid fa-plus pe-2"></i>
                            Actualizar cigarrillo                
                        </button>
                    </div>

                    <div className="mt-2">
                        <button 
                            className="custom-button guardar-cigarrillo"
                            onClick={saveUpdates}
                        >
                            <i className="fa-sharp fa-solid fa-floppy-disk pe-2"></i>
                            Guardar cigarrillos actualizados                
                        </button>
                    </div>

                    <CigarrillosToUpdateTable cigarrillosToUpdate={cigarrillosToUpdate} deleteCigarrilloToUpdate={deleteCigarrilloToUpdate} />
                </>
            )
        }


    </form>
  )
}

