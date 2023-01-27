import { Navigate, Route, Routes } from 'react-router-dom';
import { UpdateCigarrillosScreen } from '../UpdateCigarrillos/pages/UpdateCigarrillosScreen';
import { UpdateComprasVentasByDateScreen } from '../UpdateComprasVentas/pages/UpdateComprasVentasByDateScreen';
import { ComprasScreen } from '../Compras/pages/ComprasScreen';
import { CreateCigarrillosScreen } from '../CreateCigarrillos/pages/CreateCigarrillosScreen';
import { DatosScreen } from '../Datos/pages/DatosScreen';
import { DeleteComprasVentasByDateScreen } from '../DeleteComprasVentas/pages/DeleteComprasVentas';
import { VentasScreen } from '../Ventas/pages/VentasScreen';



export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/actualizarCigarrillos" element={<UpdateCigarrillosScreen/>}/>
        <Route path="/actualizarComprasVentas" element={<UpdateComprasVentasByDateScreen/>}/>
        <Route path="/crearCigarrillos" element={<CreateCigarrillosScreen/>}/>
        <Route path="/compras" element={<ComprasScreen/>}/>
        <Route path="/datos" element={<DatosScreen/>}/>
        <Route path="/eliminarComprasVentas" element={<DeleteComprasVentasByDateScreen/>}/>
        <Route path='/ventas' element={<VentasScreen /> }/>
        <Route path="*" element={ <Navigate to="/ventas"/> }/>
    </Routes>
  )
}