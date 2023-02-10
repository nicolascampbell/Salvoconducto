import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import ImageGrid from '../components/ImageGrid'

const Films = () => {
  return (
    <Grid container>
      <Grid xs={12}>
        <h1 className="fw-light text-center">Films Page</h1>
      </Grid>
      <Grid xs={12} className="text-center">
        <h5 className="fw-light">
          Is comming soon! Meanwhile you can look at some pictures
        </h5>
      </Grid>
      <Grid xs={12}>
        <ImageGrid />
      </Grid>
    </Grid>
  )
}
export default Films
