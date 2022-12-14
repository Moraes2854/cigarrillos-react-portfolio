import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SidebarHeader, SidebarContent, ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Spin as Hamburger } from 'hamburger-react'
import { Tooltip } from '@mui/material';

import BackupIcon from '@mui/icons-material/Backup';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import UpdateIcon from '@mui/icons-material/Update';

import { useAppStore, useWindowDimensions } from '../../hooks';
import { downloadBackupDB } from '../../helpers/handleDB';

import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.css';

interface ListLink {
    title:string;
    link:string;
    onClick:()=>void;
    icon:React.ReactNode;

} 

const listLinks:ListLink[] = [
    {
        title:'VENTAS',
        link:'/app/ventas',
        onClick:()=>{},
        icon:<SellIcon/>
    },
    {
        title:'COMPRAS',
        link:'/app/compras',
        onClick:()=>{},
        icon:<ShoppingCartIcon/>
    },
    {
        title:'ACTUALIZAR CIGARRILLOS',
        link:'/app/actualizarCigarrillos',
        onClick:()=>{},
        icon:<UpdateIcon/>,
    },
    {
        title:'CREAR CIGARRILLOS',
        link:'/app/crearCigarrillos',
        onClick:()=>{},
        icon:<CreateIcon/>,
    },
    {
        title:'DATOS',
        link:'/app/datos',
        onClick:()=>{},
        icon:<ShowChartIcon/>,
    },    
    {
        title:'ELIMINAR COMPRAS/VENTAS',
        link:'/app/eliminarComprasVentas',
        onClick:()=>{},
        icon:<DeleteIcon/>,
    },
    {
        title:'ACTUALIZAR COMPRAS/VENTAS',
        link:'/app/actualizarComprasVentas',
        onClick:()=>{},
        icon:<UpdateIcon/>,
    },
    {
        title:'COPIA DE SEGURIDAD',
        link:'/api/backup',
        onClick:()=>{downloadBackupDB()},
        icon:<BackupIcon/>,
    }
]



export const Sidebar = () => {

    const { sidebarOpen, setSideBarOpen } = useAppStore();
    const { width, height } = useWindowDimensions();
    

    return (
        <ProSidebar
            collapsed={sidebarOpen}
            style={{
                minHeight:height
            }}        
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: '24px 24px 24px 12px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Hamburger toggled={!sidebarOpen} onToggle={(toggled)=>{setSideBarOpen(!toggled)}} size={24}/>
                </div>
            </SidebarHeader>

            <Menu 
                iconShape="square"
            >
            {
                listLinks.map(({title, link, onClick, icon})=>(
                    <Tooltip key={`menuitem(${title})`} title={title} placement="top-start">
                        <MenuItem onClick={()=>{onClick()}} icon={icon}>
                            {title}
                            <Link to={link}/>
                        </MenuItem>
                    </Tooltip>
                ))   
            }
            </Menu>

        </ProSidebar>
    )
}

