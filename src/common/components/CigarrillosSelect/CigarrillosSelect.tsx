import React, { useState } from 'react';

import { Cigarrillo } from '../../interfaces';

import './CigarrillosSelect.css';

interface Props{
  cigarrillos:Cigarrillo[],
  onChange:(cigarrillo:Cigarrillo)=>void;
  selectRef:any;
}


export const CustomCigarrillosSelect = ({cigarrillos, onChange, selectRef}:Props) => {

  const [selectedCigarrillo, setSelectedCigarrillo] = useState<Cigarrillo>(cigarrillos[0])

  const handleChange = (cigarrilloId:string) =>{
    const c = cigarrillos.find((cigarrillo)=>cigarrillo.id === cigarrilloId);

    if (c){
      setSelectedCigarrillo(c);
      onChange(c);
    }

    if (selectRef.current) selectRef.current.focus();
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLSelectElement>)=>{
    const index = cigarrillos.findIndex((c)=>c.id === selectedCigarrillo.id);
    if (index > -1){

      if (e.key === "ArrowDown") if (index < cigarrillos.length) handleChange(cigarrillos.at(index+1)!.id);

      if (e.key === "ArrowUp") if (index > 0) handleChange(cigarrillos.at(index-1)!.id);


    } 
  }


  return (
    <select 
      className="select" 
      onChange={(e)=>{
        handleChange(e.target.value);
      }}
      ref={selectRef}
      onKeyDown={handleKeyDown}
      value={selectedCigarrillo.id}
    > 
      {
        cigarrillos.map((c)=>{
          return (
            <option 
              className="option" 
              value={c.id}
              key={`${c.id}SelectCigarrillosOption`}
            >
              {
                c.name
              }
            </option>
          )
        })
      }
    </select>
  )
} 

