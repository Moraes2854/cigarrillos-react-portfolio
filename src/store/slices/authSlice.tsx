import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../common/interfaces/user';


export interface AuthState{
    status:'checking'|'authenticated'|'not-authenticated',
    user:User|null,
    errorMessage:string
}

const initialState:AuthState = {
    status:'checking',
    user:null,
    errorMessage:''
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    onChecking:(state:AuthState)=>{
        state.status='checking',
        state.user = null,
        state.errorMessage = ''
    },
    onLogin:(state:AuthState, action:PayloadAction<AuthState>)=>{
        state.status = 'authenticated';
        state.user=action.payload.user;
        state.errorMessage=action.payload.errorMessage;
    },
    onLogout: ( state ) => {
        state.status = 'not-authenticated';
        state.user = null;
        state.errorMessage = '';
    },
    setErrorMessage:(state:AuthState, action:PayloadAction<string>)=>{
        state.errorMessage = action.payload;
    },
    clearErrorMessage: ( state:AuthState ) => {
        state.errorMessage = '';
    }  
  },
})

export const { 
    onChecking,
    onLogin,
    onLogout,
    setErrorMessage,
    clearErrorMessage
} = authSlice.actions