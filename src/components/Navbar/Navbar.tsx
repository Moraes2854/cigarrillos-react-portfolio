import { LogoutOutlined } from '@mui/icons-material';
import { AppBar, Grid, Typography, Toolbar, IconButton } from '@mui/material';
import { useAuthStore, useAppStore } from '../../hooks';

import './Navbar.css'
import Hamburger from 'hamburger-react';


export const Navbar = () => {

  const { setSideBarOpen, sidebarOpen } = useAppStore();
  const { startLogout } = useAuthStore();

  const onLogout = ()=>{
    startLogout();
  }

  return (
    <header
        className="navbar"
    >
        <div 
            className="toolbar"
        >
                
                <div className="col-3">
                    <Hamburger
                        size={22}
                        onToggle={(toggled)=>{
                            setSideBarOpen(toggled);
                        }}
                        toggled={sidebarOpen}
                    />
                </div>

                <div className="col-6">
                    <Typography variant="h6" color="info">  </Typography>
                </div>

                <div className="col-3 d-flex justify-content-end">
                    <Typography color="info" sx={{fontSize:'20px', marginRight:'10px'}}>  </Typography>
                    <IconButton
                        color='info'
                        sx={{ "&:hover": { color: "gray" } }} 
                        onClick={onLogout}
                    >
                        <LogoutOutlined/>
                    </IconButton>
                </div>

        </div>
    </header>
  )
}




