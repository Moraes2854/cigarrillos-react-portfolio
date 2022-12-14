import React, { useState, useEffect } from 'react';

import { useAppStore } from '../../hooks';

export type CompraVentaOptionType = 'COMPRAS'|'VENTAS';

const options: CompraVentaOptionType[] = ['COMPRAS', 'VENTAS'];

interface Props{
  onChange:(option:CompraVentaOptionType)=>void;
}


export const ComprasVentasSelect = ({onChange}:Props) => {

   const [selectedOption, setSelectedOption] = useState<CompraVentaOptionType>(options[0]); 

  const handleChange = (opt:CompraVentaOptionType) =>{

    if (opt){
        setSelectedOption(opt);
      onChange(opt);
    }

  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLSelectElement>)=>{
    const index = options.findIndex((opt)=>opt === selectedOption);
    if (index > -1){

      if (e.key === "ArrowDown") if (index < options.length) handleChange(options.at(index+1)!);

      if (e.key === "ArrowUp") if (index > 0) handleChange(options.at(index-1)!);


    } 
  }


  return (
    <select 
      className="select" 
      onChange={(e)=>{
        handleChange(e.target.value as CompraVentaOptionType);
      }}
      onKeyDown={handleKeyDown}
      value={selectedOption}
    > 
      {
        options.map((opt)=>{
          return (
            <option 
              className="option" 
              value={opt}
              key={`${opt}CompraVentaSelectOption`}
            >
              {
                opt
              }
            </option>
          )
        })
      }
    </select>
  )
} 



