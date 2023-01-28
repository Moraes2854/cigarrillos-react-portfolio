import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import { useAppStore, useFocus } from '../../common/hooks';
import { Cigarrillo } from '../../common/interfaces';
import { getTextoCompras } from '../../common/helpers/getTextoCompras';
import { fireErrorToast, fireSuccessToast } from '../../common/helpers/toast';

import { CreateCompraDto, FormCompra } from '../interfaces';
import { getErrorMessage, requestApi } from '../../common/helpers';
import { useLoading } from '../../common/context/LoadingContext';
import { getCigarrilloById, getComprasFromText } from '../helpers/getComprasFromText';


const createSeveralCompras = async(createComprasDtos:CreateCompraDto[]):Promise<boolean> => {

  const response = await requestApi<boolean>('/compras/createSeveral', 'POST', [...createComprasDtos]);
  
  return response;

}

const initForm:FormCompra = {
  cantidad:0,
  cigarrilloId:'noid',
  date:new Date().toISOString(),
}


export const useCompras = () => {


  const { cigarrillos, selectedCigarrillo, setSelectedCigarrillo, updateCigarrilloLocal, updateCigarrillos } = useAppStore();
  const { setLoading } = useLoading();

  const [selectRef, setFocusSelect] = useFocus();
  const [compras, setCompras] = useState<CreateCompraDto[]>([]);
  const [totalCompras, setTotalCompras] = useState<number>(0);
  const [textoCompras, setTextoCompras] = useState<string>('');

  const [form, setForm] = useState<FormCompra>(initForm);

  const { date, cigarrilloId, cantidad } = form;

  const addCompra = (c:number, id:string, fecha:string) => {

    const cigarrillo = getCigarrilloById(cigarrillos, id);
    const comprasFinal:CreateCompraDto[] = [];

    if (cigarrillo) {

      const index = compras.findIndex((c)=>c.cigarrilloId === id);

      if (index >= 0) {

        const compra:CreateCompraDto = {
          amount:(c+(compras.at(index)!.amount)),
          cigarrilloId:id,
          date:fecha,
        }

        comprasFinal.push(...compras.map((c, i) => (i === index) ? compra : c));

      }

      else {
        const compra:CreateCompraDto = {
          amount:c,
          cigarrilloId:id,
          date:fecha,
        }
        comprasFinal.push(...compras, compra)
      }
      
      setCompras(comprasFinal);

      updateCigarrilloLocal(id, {
        ...cigarrillo,
        stock:Number(cigarrillo.stock+c)
      });

    }

  }


  const onAddCompraClick = () => {
      if (selectedCigarrillo){
        const amount = cantidad;

        if (amount < 1) return fireErrorToast('Ingresar una cantidad válida');

        addCompra(amount, cigarrilloId, date);

        setForm({
          ...form,
          cantidad:0
        });

        //@ts-ignore
        setFocusSelect();
      
      }
  }
  
  
  const deleteCompra = (compra:CreateCompraDto) => {
    const cigarrillo = cigarrillos.find((c)=>c.id === compra.cigarrilloId)!;

    updateCigarrilloLocal(compra.cigarrilloId, {
      ...cigarrillo,
      stock:Number(cigarrillo.stock-compra.amount)
    });

    setCompras(compras.filter((c)=>c!==compra));

  }

  const saveCompras = async () => {

    if (compras.length < 1) return fireErrorToast('Tiene que haber al menos 1 compra para guardar');

    try {

      setLoading(true);

      const response = await createSeveralCompras(compras);
      
      setLoading(false);

      if (response)
      fireSuccessToast('Compras guardadas exitosamente');
      else 
      fireErrorToast('Error al guardar las compras');
      
    } catch (error) {
      setLoading(false);
      fireErrorToast(getErrorMessage(error));
    }

    setCompras([]);

  } 
  
  const updateCompraAmount = (cigarrilloId:string, newAmount:number) => {
    const index = compras.findIndex((c)=>c.cigarrilloId === cigarrilloId);

    if (index >= 0){
      const oldCompra = compras.at(index)!;

      const updatedCompra:CreateCompraDto = {
        ...oldCompra,
        amount:newAmount,
      }

      setCompras(compras.map((c, i) => (i === index) ? updatedCompra : c));

      const cigarrillo = cigarrillos.find((c)=>c.id === cigarrilloId)!;
      
      updateCigarrilloLocal(cigarrilloId, {
        ...cigarrillo,
        stock:(cigarrillo.stock - oldCompra.amount + newAmount)
      });
    }
  }

  const onCigarrilloChange = (c:Cigarrillo)=>{
    setSelectedCigarrillo(c.id);
    setForm({
      ...form,
      cantidad:0
    })
  }

  const onDateChange = (date:Date) =>{
    setForm({
      ...form,
      date:date.toISOString(),
    });
  }

  const onCantidadChange = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    setForm({
      ...form,
      cantidad:Number(e.target.value.replace(/\D/g, ''))
    })
  }
  
  const cargarCompras = async( ) => {

    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Ingrese listado de compras',
      inputPlaceholder: '',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    
    if (text) {
      
      const nuevasCompras = getComprasFromText( cigarrillos, text, date )

      setCompras([...compras, ...nuevasCompras]);

      const cigarrillosConCantidadActualizadas:Cigarrillo[] = [];

      nuevasCompras.forEach((compra)=>{

        const c = getCigarrilloById(cigarrillos, compra.cigarrilloId);

        if (c){
          cigarrillosConCantidadActualizadas.push({
            ...c,
            stock:Number( c.stock + compra.amount)
          });
        }

      });

      const updatedCigarrillos:Cigarrillo[] = cigarrillos.map((cigarrillo)=>{
        const c = cigarrillosConCantidadActualizadas.find((c)=>c.id === cigarrillo.id)!;
        return (c) ? c : cigarrillo
      });
      
      updateCigarrillos(updatedCigarrillos);
      
    }
  }

    useEffect(()=>{
      
      if (cigarrillos.length > 0 ) setSelectedCigarrillo(cigarrillos[0].id);

    }, []);

    useEffect(()=>{
      if (selectedCigarrillo){
        setForm({
          ...form,
          cigarrilloId:selectedCigarrillo.id
        });
      }
    }, [selectedCigarrillo]);

    useEffect(()=>{
      setTotalCompras(compras.reduce((acc, obj) => {
        const cigarrillo = cigarrillos.find((c)=>c.id === obj.cigarrilloId)!;

        return acc+(obj.amount*cigarrillo.buy_price);

      }, 0));

      setTextoCompras(getTextoCompras(compras, cigarrillos))
    }, [compras])

    return {
      onAddCompraClick,
      deleteCompra,
      saveCompras,
      onCigarrilloChange,
      onDateChange,
      onCantidadChange,
      updateCompraAmount,
      cargarCompras,

      ...form,
      compras,
      selectRef,
      totalCompras,
      textoCompras,
      
    }
}
