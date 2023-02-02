import 'styles/globals.scss'

import SSRProvider from 'react-bootstrap/SSRProvider'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import { Footer } from '../components/Footer'
import NavbarMenu from 'components/NavbarMenu'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Head>
        <title>Salvoconducto</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="../favicon/favicon.svg"
        />
        <link
          rel="icon"
          type="image/png"
          href="../favicon/favicon.png"
        ></link>
      </Head>
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
