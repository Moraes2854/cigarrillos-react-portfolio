import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ComprasTable, CustomButton } from '../';
import { CreateCompraDto } from '../../interfaces';
import { fireSuccessToast, fireErrorToast } from '../../helpers/toast';

interface Props {
    compras:CreateCompraDto[];
    textoCompras:string; 
    totalCompras:number; 
    deleteCompra:(compra:CreateCompraDto)=>void;
    updateCompraAmount:(cigarrilloId:string, newAmount:number)=>void;
    cargarCompras:()=>void;
}

export const ComprasDetails = ({ compras, textoCompras, totalCompras, deleteCompra, updateCompraAmount, cargarCompras }: Props) => {

    
    return (
        <>

            <div className="row mt-2">

                <div className="col w-100">
                    <CopyToClipboard
                        text={textoCompras}
                        onCopy={()=>{
                            if (textoCompras.length < 1) fireErrorToast('No hay compras disponibles para copiar')
                            else fireSuccessToast('Compras copiadas!')
                        }}
                    >
                        <button 
                            className="custom-button copiar-compras"
                        >
                            <i className="fa-solid fa-copy pe-2"></i>
                            Copiar compras                
                        </button>
                    </CopyToClipboard>
                </div>

                <div className="col w-100">
                    <button 
                        className="custom-button cargar-compras"
                        onClick={cargarCompras}
                    >
                        <i className="fa-solid fa-upload pe-2"></i>
                        Cargar compras                
                    </button>
                </div>

            </div>



            <div className="mt-2">
                <input
                    className="form__input"
                    value={`Total compras: $${totalCompras}`}
                    placeholder={`Total compras: $`} 
                    disabled={true}
                />
            </div>

            <ComprasTable compras={compras} deleteCompra={deleteCompra} updateCompraAmount={updateCompraAmount}/>
        </>    
    )

}
