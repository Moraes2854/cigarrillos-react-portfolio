import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { Cigarrillo } from '../interfaces/cigarrillo';
import { useLoading } from '../context/LoadingContext';
import { setCigarrillosMenuOpenStore, setCigarrillosStore, setSelectedCigarrilloStore, setSidebarOpenStore } from '../../store';
import { fireErrorToast, getErrorMessage, requestApi } from '../helpers';



export const useAppStore = () => {

    const { setLoading } = useLoading();

    const { cigarrillos, sidebarOpen, selectedCigarrillo, cigarrillosMenuOpen } = useAppSelector( (state) => state.app );

    const dispatch = useAppDispatch();

    const setSideBarOpen = (open:boolean)=>{
        dispatch(setSidebarOpenStore(open))
    }

    const setSelectedCigarrillo = (id:string) => {
        dispatch(setSelectedCigarrilloStore(id));
    }

    const changeCigarrillosMenuOpen = () => {
        dispatch(setCigarrillosMenuOpenStore(!cigarrillosMenuOpen))
    }

    const cargarCigarrillos = () =>{
        console.log('cargarCigarrillos fired');

        try {
            setLoading(true);
            requestApi<Cigarrillo[]>(`/cigarrillos`, 'GET')
            .then((cigarrillos) => {
                dispatch(setCigarrillosStore(cigarrillos))
                setLoading(false);
            })
            .catch((err)=>{
                setLoading(false);
            })

        } catch (error) {
            setLoading(false);
            fireErrorToast(getErrorMessage(error));
        }

    }

    const updateCigarrillos = (cigarrillos:Cigarrillo[]) => {
        dispatch(setCigarrillosStore(cigarrillos));
    }

    const updateCigarrilloLocal = (cigarrilloId:string, cigarrillo:Cigarrillo) => {
        const index = cigarrillos.findIndex((c)=>c.id === cigarrilloId);
        if (index>=0){
            dispatch(setCigarrillosStore(cigarrillos.map((c)=>(c.id!==cigarrilloId) ? c : cigarrillo)));
        }
    }

    useEffect(()=>{
        if (selectedCigarrillo) setSelectedCigarrillo(selectedCigarrillo.id);
    }, [cigarrillos]);

    return {
        cigarrillos,
        sidebarOpen,
        cigarrillosMenuOpen,
        selectedCigarrillo,
        
        setSelectedCigarrillo,
        updateCigarrilloLocal,
        setSideBarOpen,
        changeCigarrillosMenuOpen,
        cargarCigarrillos,
        updateCigarrillos
    }
}
