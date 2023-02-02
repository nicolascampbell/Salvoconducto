import React from 'react'
import { useRouter } from 'next/router'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import Definition from '../components/Definition'

export default function Home() {
  const router = useRouter()
  const getLink = (path) => `${router.basePath}${path}`
  return (
    <Grid container justifyContent={'center'}>
      <Grid xs={5} md={3} >
        <img
          src={getLink('/about.jpg')}
          srcSet={getLink('/about.jpg')}
          alt={'Foto of Nicolas'}
          loading="lazy"
          height="auto"
          width={'100%'}
        />
        <span className="img-subtitle"> Foto by Matt</span>
      </Grid>
      <Grid xs={10} md={6} mdOffset={1}>
        <Definition
          title={'Nicolás'}
          subtitle={'[ni.koˈlas]'}
          type={'Person'}
          definitions={[
            'I like yellow.',
            'I come from Uruguay.',
            'I started to take pictures in 2018.',
            'I got an Olympus Trip 35 as a gift before moving to Germany, that is how it all started.',
            'Taking pictures is a way for me to save what I like and to better understand myself.',
            'Please let me know if you find mistakes or errors, they know how to hide too well.'
          ]}
        />
      </Grid>
    </Grid>
  )
}
