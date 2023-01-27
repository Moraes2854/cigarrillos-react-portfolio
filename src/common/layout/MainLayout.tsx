import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { LoadingSpinner, Sidebar } from '../components';

import { useLoading } from '../context/LoadingContext';
import { useAppStore } from '../hooks';

import 'react-toastify/dist/ReactToastify.css';
import './GlobalStyles.css';

export const MainLayout = ({children}:any) => {

  const { loading } = useLoading();
  const { cigarrillos, cargarCigarrillos } = useAppStore();


//   useEffect(()=>{
//     if (cigarrillos.length === 0) cargarCigarrillos();
//   }, []);

  return (
        <div
            className="d-flex"
            style={{
                width:'100vw',
            }}
        >
            {
                (loading) 
                ? <LoadingSpinner />
                :(
                    <>
                        <Sidebar/>

                            
                        <div 
                            className="main-container"
                            style={{
                                width:'100vw',
                                display:'flex',
                                justifyContent:'center',
                                marginTop:'70px',
                            }}
                            
                        >

                            <div className="row" style={{minWidth:'80vw'}}>
                                <div className="col"></div>

                                <div className="col-10 col-md-6 justify-content-center">
                                    <div className="w-100">
                                        { 
                                            (cigarrillos.length > 0) && children 
                                        }
                                    </div>
                                </div>

                                <div className="col"></div>
                            </div>

                        </div>

                    </>

                )
            }



            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}
