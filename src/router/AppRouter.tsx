import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { AuthRoutes } from './AuthRoutes';
import { useAuthStore } from '../common/hooks';


export const AppRouter = () => { 
  const { status, checkAuthToken } = useAuthStore();

  useEffect(()=>{
    checkAuthToken();
  }, []);

  const { pathname } = useLocation();

  useEffect(()=>{
    if (pathname.startsWith('/app'))localStorage.setItem('lastPath', pathname);
  }, [pathname])


  return (
    <Routes>
        {
          (status !== 'authenticated') 
          ? 
          (
            <>
              <Route path="/auth/*" element={<AuthRoutes />}/>
              <Route path="/*" element={<Navigate to="/auth/login"/>} />
            </>
          )
          : 
          (
            <>
              <Route path="/app/*" element={<AppRoutes />}/>
              <Route path="/*" 
                element={
                  (localStorage.getItem('lastPath')) 
                  ? <Navigate to={`${localStorage.getItem('lastPath')}`}/>
                  : <Navigate to={`/app/ventas`}/>
                }
              />
            </>
          )
        }
    </Routes>
  )
  
}

// export const AppRouter = () => { 
//   return (
//     <Routes>
//         <Route path="/app/*" element={<AppRoutes />}/>
//         <Route path="/*" 
//           element={
//             (localStorage.getItem('lastPath')) 
//             ? <Navigate to={`${localStorage.getItem('lastPath')}`}/>
//             : <Navigate to={`/app/ventas`}/>
//           }
//         />
//     </Routes>
//   )
  
// }

