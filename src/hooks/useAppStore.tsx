import { useEffect } from 'react';
import { fireErrorToast } from '../helpers/toast';
import { setCigarrillosStore, setSelectedCigarrilloStore, setSidebarOpenStore, setCigarrillosMenuOpenStore } from '../store';
import { useAppDispatch, useAppSelector } from './hooks';
import { Cigarrillo } from '../interfaces/cigarrillo';
import { requestApi } from '../helpers/handleDB';
import { useLoading } from '../context/LoadingContext';
import { getErrorMessage } from '../helpers/getErrorMessage';



export const useAppStore = () => {
    const { loading, setLoading } = useLoading();

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

        try {
            // dispatch(setCigarrillosStore([
            //     {
            //         id:'123',
            //         buy_price:10,
            //         isActive:true,
            //         name:'cigarrillo xd',
            //         sell_price:20,
            //         stock:10
            //     }
            // ]))
            setLoading(true);
            requestApi<Cigarrillo[]>(`/cigarrillos`, 'GET')
            .then((cigarrillos) => {
                dispatch(setCigarrillosStore(cigarrillos))
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
    }, [cigarrillos])

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
