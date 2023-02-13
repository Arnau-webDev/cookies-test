import { useEffect, useState } from 'react';
import type { AppContext, AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';

import Cookies from 'js-cookie';
import { darkTheme, lightTheme, customTheme } from '../themes';
import '../styles/globals.css';

interface Props extends AppProps {
  theme: string;
}
export default function App({ Component, pageProps, theme = 'dark' }: Props) {

  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  useEffect(() => {
    
    const cookieTheme = Cookies.get('theme') || 'light';
    const selectedTheme = cookieTheme === 'light'
        ? lightTheme
        : (cookieTheme === 'dark')
          ? darkTheme
          : customTheme;
    
    setCurrentTheme( selectedTheme );
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// App.getInitialProps = async( appContext: AppContext ) => {

//   const { theme } = appContext.ctx.req ? ( appContext.ctx.req as any).cookies : { theme: 'light' }
  
//   const validThemes = ['light','dark','custom'];
//   // console.log('getInitialProps: ', cookies);

//   return {
//     theme: validThemes.includes( theme ) ? theme : 'dark',
//   }

// }
