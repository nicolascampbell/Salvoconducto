import React from 'react'
import { useRouter } from 'next/router'
import { emphasize, Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import Definition from '../components/Definition'

export default function Home() {
  const router = useRouter()
  const getLink = (path) => `${router.basePath}${path}`

  return (
    <Grid container justifyContent={'center'}>
      <Grid xs={10} sm={7} md={5} lg={4}>
        <Definition
          title={'Salvoconducto'}
          subtitle={
            <span>
              [Sal·βo·kon·<strong>duk</strong>·to]
            </span>
          }
          type={'Website'}
          definitions={[
            'A place to share what my eyes see.',
            'Within can be found all my films and collections.',
            `The name means: Freedom to do something without fear of punishment.`
          ]}
        />
      </Grid>
    </Grid>
  )
}
