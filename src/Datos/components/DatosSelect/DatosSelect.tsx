import React, { useState } from 'react';
import { DatosOption } from '../../interfaces/datos';


import './DatosSelect.css';

interface Props{
  options:DatosOption[];
  onChange:(option:DatosOption)=>void;
  selectRef:any;
  currentOption:DatosOption;
}


export const DatosSelect = ({options, onChange, selectRef, currentOption}:Props) => {


  const [selectedOption, setSelectedOption] = useState<DatosOption>(currentOption)

  const handleChange = (value:number) =>{
    const option = options.find((opt)=>opt.value === value);

    if (option){
      setSelectedOption(option)
      onChange(option);
    }
    
    if (selectRef.current) selectRef.current.focus();
  }


  const handleKeyDown = (e:React.KeyboardEvent<HTMLSelectElement>)=>{
    const index = options.findIndex((c)=>c.value === selectedOption.value);
    if (index > -1){

      if (e.key === "ArrowDown") if (index < options.length) handleChange(options.at(index+1)!.value);

      if (e.key === "ArrowUp") if (index > 0) handleChange(options.at(index-1)!.value);

    } 
  }


  return (
    <select 
      className="select" 
      onChange={(e)=>{
        handleChange(Number(e.target.value));
      }}
      ref={selectRef}
      onKeyDown={handleKeyDown}
      value={Number(selectedOption.value)}
    > 
      {
        options.map((opt)=>{
          return (
            <option 
              className="option" 
              value={Number(opt.value)}
              key={`${opt.value}SelectDatoOption`}
            >
              {
                opt.title
              }
            </option>
          )
        })
      }
    </select>
  )
} 
