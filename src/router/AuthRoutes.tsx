import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../login/pages/LoginScreen';


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={ <LoginScreen /> } />
        <Route path='*' element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}