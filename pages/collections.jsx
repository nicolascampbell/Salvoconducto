import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import ImageList from '../components/ImageList'
const Collections = () => {
  return (
    <Grid container>
      <Grid xs={12}>
        <h1 className="text-center">Coollections Page</h1>
      </Grid>
      <Grid xs={12} className="text-center">
        <h5 className="fw-light">Is comming soon!</h5>
      </Grid>
    </Grid>
  )
}
export default Collections
