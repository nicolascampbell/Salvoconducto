import React from 'react'
import { useRouter } from 'next/router'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import Definition from '../components/Definition'
import CustomImage from '@/components/CustomImage'
import Image from 'next/image'
export default function About() {
  const router = useRouter()
  const getLink = (path) => `${router.basePath}${path}`
  return (
    <Grid container justifyContent={'center'} alignItems={'center'} marginY={2}>
      <Grid xs={10} md={3}>
        <CustomImage
          src={getLink('/about.jpg')}
          width={1651}
          height={2232}
        />
      </Grid>
      <Grid xs={10} md={6} lg={5} mdOffset={1}>
        <Definition
          title={'Conducto'}
          subtitle={"/kon'duk·to/"}
          classes='special-definition'
          type={'Person'}
          definitions={[
            'I like yellow.',
            'I started to take pictures in 2018.',
            'I got an Olympus Trip 35 as a gift, that is how it all started.',
            'Taking pictures is a way for me to save what I like and to understand myself better.',
          ]}
        />
      </Grid>
    </Grid>
  )
}
