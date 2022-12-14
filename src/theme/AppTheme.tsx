import { ThemeProvider } from '@emotion/react'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { defaultTheme } from './defaultTheme';



export const AppTheme = ({children}:any) => {

  return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline/>
        <GlobalStyles
          styles={{
            body: { 
              backgroundColor: defaultTheme.palette.primary.main,
              height:'100vh'
            },
          }}
        />
        {children}
      </ThemeProvider>
  )
}
