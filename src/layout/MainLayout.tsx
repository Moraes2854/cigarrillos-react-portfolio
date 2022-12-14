import { Navbar, Sidebar } from "../components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';

import './GlobalStyles.css';

export const MainLayout = ({children}:any) => {


  return (
        <div
            className="d-flex"
            style={{
                width:'100vw',
            }}
        >


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
                        { children }
                    </div>

                    <div className="col"></div>
                </div>
            
            </div>

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
