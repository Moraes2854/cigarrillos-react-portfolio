import { useState, useEffect } from 'react';

import { useAppStore, useDB, useFocus } from './';
import { Cigarrillo, CreateCompraDto, FormCompra } from '../interfaces';
import { getTextoCompras } from '../helpers/getTextoCompras';
import { fireErrorToast } from '../helpers/toast';

import Swal from 'sweetalert2';



export const useCompras = () => {


  const { cigarrillos, selectedCigarrillo, setSelectedCigarrillo, updateCigarrilloLocal, updateCigarrillos } = useAppStore();
  const { createSeveralCompras } = useDB(); 
  const [selectRef, setFocusSelect] = useFocus();
  const [compras, setCompras] = useState<CreateCompraDto[]>([]);
  const [totalCompras, setTotalCompras] = useState<number>(0);
  const [textoCompras, setTextoCompras] = useState<string>('');

  const [form, setForm] = useState<FormCompra>({
    cantidad:0,
    cigarrilloId:cigarrillos.at(0)!.id,
    date:new Date().toISOString(),
  });

  const { date, cigarrilloId, cantidad } = form;

    const addCompra = (c:number, id:string, fecha:string) => {
      const cigarrillo = getCigarrilloById(id);
      const comprasFinal:CreateCompraDto[] = [];
      if (cigarrillo){
        const index = compras.findIndex((c)=>c.cigarrilloId === id);

        if (index >= 0){
  
          const compra:CreateCompraDto = {
            amount:(c+(compras.at(index)!.amount)),
            cigarrilloId:id,
            date:fecha,
          }
          comprasFinal.push(...compras.map((c, i) => (i === index) ? compra : c))
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

    const saveCompras = ()=>{
      createSeveralCompras(compras);
      setCompras([]);
      setTotalCompras(0);
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
        const texto:string = text.replace(/[\r\n]/gm, '') as string;
        const nuevasCompras:CreateCompraDto[] = []; 
        //index es la posicion donde empieza el nombre del cigarrillo en el texto.
        const cigarrillosEnTexto:{index:number, cigarrilloId:string}[] = []; 
        const lineasTexto:string[] = [];
        let indexAnterior=0;

 
        
        //ACA GUARDAMOS TODOS LOS CIGARRILLOS QUE HAY EN EL TEXTO JUNTO A SU INDEX EN EL TEXTO
        cigarrillos.forEach((cigarrillo)=>{
            if (texto.search(cigarrillo.name)>0){
                cigarrillosEnTexto.push({
                  index:texto.search(cigarrillo.name),
                  cigarrilloId:cigarrillo.id,
                });
            }
        });

        // SE ORDENA LOS CIGARRILLOS ENCONTRADOS EN EL TEXTO POR SU ORDEN EN EL TEXTO IMPORTANTISIMO!
        cigarrillosEnTexto.sort((a, b) => a.index-b.index);

        // GUARDAMOS LAS LINEAS DE TEXTO
        cigarrillosEnTexto.forEach((currentIndex)=>{
            let linea = "";
            const c = getCigarrilloById(currentIndex.cigarrilloId);
            if (c){
              // SE EMPIEZA DESDE EL INDEX DEL ULTIMO CIGARRILLO (EL PRIMERO ES 0)
              //INDEX ANTERIOR SERIA DONDE EMPIEZA EL NOMBRE + EL NOMBRE
              for (let i=indexAnterior; i<(currentIndex.index+c.name.length); i++)linea+=texto.charAt(i);
              indexAnterior=currentIndex.index+c.name.length;
              lineasTexto.push(linea);
            }
            linea="";
        });

        lineasTexto.forEach((aux, i)=>{
            let cigarrilloNombre="";
            //[0] = cantidad ----- [1] = Unidades ----- [2] = De ----- [3] = inicio nombre del cigarrillo
            const partes=aux.split(" ");
            const cantidadCigarrilloString = partes[0];
            
            //agarro todo lo que resta a partir de la posicion 3 osea el nombre del cigarrillo
            const arrayNombre = partes.slice(3);

            arrayNombre.forEach((parte)=>{
              cigarrilloNombre+=parte+" "
            });

            cigarrilloNombre=cigarrilloNombre.slice(0, -1);

            const filtro = getCigarrilloByNombre(cigarrilloNombre);

            if (filtro){
              nuevasCompras.push({
                amount:Number(cantidadCigarrilloString),
                cigarrilloId:filtro.id,
                date
              });
            }
        });

        setCompras([...compras, ...nuevasCompras]);

        const cigarrillosConCantidadActualizadas:Cigarrillo[] = [];

        nuevasCompras.forEach((compra)=>{
          const c = getCigarrilloById(compra.cigarrilloId);

          if (c){
            cigarrillosConCantidadActualizadas.push({
              ...c,
              stock:Number(c.stock+compra.amount)
            });
          }

        });

        updateCigarrillos(cigarrillos.map((cigarrillo)=>{
          const c = cigarrillosConCantidadActualizadas.find((c)=>c.id === cigarrillo.id);
          return (c) ? c : cigarrillo
        }));
        
      }
    }

    const getCigarrilloById = (id:string) => {
      return cigarrillos.find((c)=>c.id === id);
    }

    const getCigarrilloByNombre = (nombre:string)=>{
      return cigarrillos.find((c)=>c.name === nombre);
    }

    useEffect(()=>{
      setSelectedCigarrillo(cigarrillos[0].id);
    }, []);

    useEffect(()=>{
      if (selectedCigarrillo){
        setForm({
          ...form,
          cigarrilloId:selectedCigarrillo!.id
        });
      }
    }, [selectedCigarrillo]);

    useEffect(()=>{
      setTotalCompras(compras.reduce((acc, obj) => {
        const cigarrillo = cigarrillos.find((c)=>c.id === obj.cigarrilloId)!;

        return acc+(obj.amount*cigarrillo.buy_price);

      }, 0))
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
