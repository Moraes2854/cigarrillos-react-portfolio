import { useAppSelector, useAppDispatch } from './hooks';
import { clearErrorMessage, onChecking, onLogin, onLogout, setErrorMessage } from '../../store';
import authApi from '../../api/authApi';
import { fireErrorToast } from '../helpers/toast';
import { useLoading } from '../context/LoadingContext';
import { ValidRoles } from '../interfaces/user';
import axios from 'axios';



interface AuthApiResponse{
    id: string;
    email: string;
    password: string;
    fullName: string;
    isActive: boolean;
    roles: ValidRoles[];
    token: string;
}

export const useAuthStore = () => {
    const { status, user, errorMessage } = useAppSelector( (state) => state.auth );
    const dispatch = useAppDispatch();
    const { setLoading } = useLoading();

    const startLogin = async({ email, password }:{email:string, password:string}) => {
        setLoading(true);
        dispatch( onChecking() );
        try {
            const { data } = await authApi.post<AuthApiResponse>( '/login', { email, password } );
            const { token, ...user } = data;
            localStorage.setItem('token', token );
            localStorage.setItem('token-init-date', `${new Date().getTime()}` );
            dispatch( onLogin({status:'authenticated', user, errorMessage:''}) );
            setLoading(false);
            
        } catch (error) {
            // setLoading(false);
            dispatch( onLogout() );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
            fireErrorToast((error as Error).message);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );
      
        try {
            const { token:newToken, ...user } = (await authApi.get<AuthApiResponse>('/checkToken')).data;
            localStorage.setItem('token', newToken );
            localStorage.setItem('token-init-date', `${new Date().getTime()}` );
            dispatch( onLogin({ status:'authenticated', user, errorMessage:'' }) );
            
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
            dispatch( setErrorMessage((error as Error).message));
            fireErrorToast((error as Error).message);
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }



    return {
        //* Propiedades
        errorMessage,
        status, 
        user, 

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
    }

}

