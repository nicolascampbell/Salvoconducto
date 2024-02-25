import 'styles/globals.scss'

import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import { Footer } from '../components/Footer'
import { usePreserveScroll } from 'hooks/usePreserveScroll'
import NavbarMenu from 'components/NavbarMenu'
import Head from 'next/head'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  responsiveFontSizes
} from '@mui/material/styles'
import { pink } from '@mui/material/colors'


let theme = extendTheme({
  typography: {
    fontFamily: "'Jost', sans-serif"
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#8748C5'
        },
        secondary: {
          main: '#AB73E2'

        },
        supportAccent: {
          main: '#ff69b4'
        }
      }
    },
    dark: {
      palette: {
        text:{
          primary:'#f0f0f0'
        },
        background: {
          default: '#140D1A'
        }
      }
    }
  }
})
theme = responsiveFontSizes(theme)
function MyApp({
  Component,
  pageProps,
}) {
  usePreserveScroll()
  return (
    <CssVarsProvider theme={theme}>
      <Head>
        <title>Salvoconducto</title>
        <link rel="icon" type="image/svg+xml" href="../favicon/favicon.svg" />
        <link
          rel="icon"
          type="image/png"
          href="../favicon/favicon.png"
        ></link>
      </Head>

      <NavbarMenu />
      <Grid padding={1} className='main-content' container sx={{ zIndex: 100, position: 'relative' }}>
        <Grid xs={12}>
          <Component {...pageProps} />
        </Grid>
      </Grid>
    </CssVarsProvider>
  )
}

export default MyApp
