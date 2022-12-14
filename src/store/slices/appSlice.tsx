import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cigarrillo } from '../../interfaces';
import { Venta } from '../../interfaces/venta';
import { Compra } from '../../interfaces/compra';



export interface AppSlice{
  cigarrillos:Cigarrillo[],
  selectedCigarrillo:Cigarrillo|null,
  sidebarOpen:boolean,
  cigarrillosMenuOpen:boolean;
}

const initialState:AppSlice = {
  cigarrillos:[],
  selectedCigarrillo:null,
  sidebarOpen:true,
  cigarrillosMenuOpen:false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCigarrillosStore:(state:AppSlice, action:PayloadAction<Cigarrillo[]>)=>{
      state.cigarrillos=action.payload;
    },
    setSelectedCigarrilloStore:(state:AppSlice, action:PayloadAction<string>)=>{
      state.selectedCigarrillo = state.cigarrillos.find((cigarrillo)=>cigarrillo.id===action.payload)!;
    },
    setSidebarOpenStore:(state:AppSlice, action:PayloadAction<boolean>)=>{
      state.sidebarOpen=action.payload;
    },
    setCigarrillosMenuOpenStore:(state:AppSlice, action:PayloadAction<boolean>)=>{
      state.cigarrillosMenuOpen=action.payload;
    }
  },
});

export const { setCigarrillosStore, setSelectedCigarrilloStore, setSidebarOpenStore, setCigarrillosMenuOpenStore } = appSlice.actions;