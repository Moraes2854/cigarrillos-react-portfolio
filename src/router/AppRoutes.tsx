import { Navigate, Route, Routes } from 'react-router-dom';
import { 
  ActualizarCigarrillosScreen, 
  ActualizarComprasVentasByDateScreen,
  CrearCigarrillosScreen, 
  ComprasScreen, DatosScreen, 
  VentasScreen, 
  EliminarComprasVentasByDateScreen 
} from '../pages';


export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/actualizarCigarrillos" element={<ActualizarCigarrillosScreen/>}/>
        <Route path="/actualizarComprasVentas" element={<ActualizarComprasVentasByDateScreen/>}/>
        <Route path="/crearCigarrillos" element={<CrearCigarrillosScreen/>}/>
        <Route path="/compras" element={<ComprasScreen/>}/>
        <Route path="/datos" element={<DatosScreen/>}/>
        <Route path="/eliminarComprasVentas" element={<EliminarComprasVentasByDateScreen/>}/>
        <Route path='/ventas' element={<VentasScreen/> }/>
        <Route path="*" element={ <Navigate to="/ventas"/> }/>
    </Routes>
  )
}