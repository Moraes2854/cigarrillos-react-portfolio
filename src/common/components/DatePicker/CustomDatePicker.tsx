import DatePicker, { registerLocale } from 'react-datepicker';
import { useState, useRef } from 'react';

import es from 'date-fns/locale/es';
registerLocale('es', es)

import "react-datepicker/dist/react-datepicker.css";

const today = new Date();


interface DatePickerProps{
  date:Date;
  onChange:(date:Date)=>void
}

export const CustomDatePicker = ({date, onChange}:DatePickerProps)=>{
  
  const [startDate, setStartDate] = useState(date);
  const inputRef = useRef(null);

  return (
    
    <DatePicker
      closeOnScroll={true}
      selected={startDate}
      onChange={(date)=>{
        if (date){
          setStartDate(new Date(date.setHours(0, 0, 0, 0)));
          onChange(new Date(date.setHours(0, 0, 0, 0)));
        }
      }}
      locale="es"
      customInput={<input className="form__input" ref={inputRef} />}
      placeholderText="Click to select a date"
      dateFormat={'dd/MM/yyyy'}
    >



    </DatePicker>
  )
}

