import React from 'react'
import { useRouter } from 'next/router'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import Definition from '../components/Definition'

export default function Home() {
  const router = useRouter()
  const getLink = (path) => `${router.basePath}${path}`

  return (
    <Grid container justifyContent={'center'}>
      <Grid xs={4}>
        <Definition
          title={'Salvoconducto'}
          subtitle={'[Sal·vo·con·duc·to]'}
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
