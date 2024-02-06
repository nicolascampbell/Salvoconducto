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
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: 'hsl(270, 56%, 55%)'
        },
        secondary:{
          main:'#fb5e37'
          
        },
        supportAccent: {
          main: '#ff69b4'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: pink[400]
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
        <Grid xs={12} >
          <NavbarMenu />
        </Grid>
        <Grid padding={2} container style={{ height: '100%' }}>
          <Grid xs={12}>
            <Component {...pageProps} />
          </Grid>
        </Grid>
      </CssVarsProvider>
  )
}

export default MyApp
