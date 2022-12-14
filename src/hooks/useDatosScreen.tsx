import { useState, useEffect } from 'react'
import { DatosOption, DatoResponse } from '../interfaces';
import { useFocus, useDB } from '.';


const datosOptions:DatosOption[] = [
    {
        title:'Generales',
        link:'/generales',
        datepickers:0,
        httpMethod:'GET',
        value:0
    },
    {
        title:'Cigarrillos mas vendidos',
        link:'/CigarrillosMasVendidos',
        datepickers:0,
        httpMethod:'GET',
        value:1
    },
    {
        title:'Cigarrillos mas comprados',
        link:'/CigarrillosMasComprados',
        datepickers:0,
        httpMethod:'GET',
        value:2
    },
    {
        title:'Días de mayor venta',
        link:'/DiasDeMayorVenta',
        datepickers:0,
        httpMethod:'GET',
        value:3

    },
    {
        title:'Días de mayor compra',
        link:'/DiasDeMayorCompra',
        datepickers:0,
        httpMethod:'GET',
        value:4
    },
    {
        title:'Ventas del día',
        link:'/VentasDelDia',
        datepickers:1,
        httpMethod:'POST',
        value:5
    },
    {
        title:'Compras del día',
        link:'/ComprasDelDia',
        datepickers:1,
        httpMethod:'POST',
        value:6
    },
    {
        title:'Ventas entre dos días',
        link:'/VentasEntreDosDias',
        datepickers:2,
        httpMethod:'POST',
        value:7
    },
    {
        title:'Compras entre dos días',
        link:'/ComprasEntreDosDias',
        datepickers:2,
        httpMethod:'POST',
        value:8
    },
    // {
    //     title:'Mayor venta de cigarrillos por día',
    //     link:'/MayorVentaPorCigarrillo',
    //     datepickers:0,
    //     httpMethod:'GET',
    //     value:9
    // },
    // {
    //     title:'Unidades vendidas entre dos días',
    //     link:'/UnidadesVendidasEntreDosDias',
    //     datepickers:2,
    //     httpMethod:'POST',
    //     value:10
    // }
];




export const useDatosBody = () => {

    const { consultarDato }  = useDB();

    const [selectRef, setFocusSelect] = useFocus();

    const [initDate, setInitDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [currentDato, setCurrentDato] = useState<DatoResponse|null>(null);

    const [currentOption, setCurrentOption] = useState<DatosOption>(datosOptions[0]);

    const onOptionChange = (option:DatosOption) => {
        setCurrentOption(option);
    }

    const onInitDateChange = (date:Date) => {
        setInitDate(date);
    }

    const onEndDateChange = (date:Date) => {
        setEndDate(date);
    }

    const onButtonClick = () => {
        const data = 
        (currentOption.datepickers === 2) ? { initDate, endDate }
        : (currentOption.datepickers === 1) ? {date:initDate}
        : {};


        consultarDato(currentOption.link, currentOption.httpMethod, data)
        .then((dato)=>{
            setCurrentDato(dato);
        })
    }


    useEffect(()=>{
        onButtonClick();
    }, [])
    
    return {
        initDate,
        onInitDateChange,
        endDate,
        onEndDateChange,
        currentDato,

        currentOption,
        datosOptions,
        onOptionChange,
        selectRef,
        onButtonClick
    }
}
