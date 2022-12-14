import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './router/AppRouter';

export const CigarrillosApp = () =>{

  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}