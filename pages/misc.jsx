import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2

import { useRouter } from 'next/router'
import YoutubeEmbed from '../components/YoutubeEmbed'
const Miscellaneous = () => {
  const router = useRouter()
  const getLink = (path) => `${router.basePath}${path}`
  return (
    <Grid container justifyContent={'center'}>
      <Grid xs={12}>
        <h1 className="fw-light text-center">Miscellaneous Page</h1>
      </Grid>
      <Grid xs={12} className="text-center">
        <h5 className="fw-light">
          Is comming somewhen! I am still working on it!
        </h5>
      </Grid>
      <Grid  xs={6}>
        <img src={getLink('/workinOnIt.webp')} alt="" />
      </Grid>
    </Grid>
  )
}
export default Miscellaneous
