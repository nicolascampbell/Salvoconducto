import '../styles/globals.scss'
// Variables
import '../styles/variables.scss'
// Components
import '../styles/components/definitions.scss'
import '../styles/components/navbar.scss'
// Pages
import '../styles/pages/misc.scss'
// Extras
import '../styles/Home.module.scss'
import '../styles/components.scss'
import '../styles/font-faces/roboto-mono.scss'
import '../styles/font-faces/roboto.scss'
import '../styles/font-faces/manrope.scss'
import SSRProvider from 'react-bootstrap/SSRProvider'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import { Footer } from '../components/Footer'
import NavbarMenu from '../components/NavbarMenu'

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Grid padding={2} container style={{ height: '100vh' }}>
        <Grid item xs={12}>
          <NavbarMenu />
        </Grid>
        <Grid item xs={12}>
          <Component {...pageProps} />
        </Grid>
      </Grid>
    </SSRProvider>
  )
}

export default MyApp
