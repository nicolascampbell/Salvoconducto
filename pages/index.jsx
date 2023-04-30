import React from 'react'
import { useRouter } from 'next/router'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import Definition from '../components/Definition'
export default function Home() {
  const router = useRouter()
  const getLink = (path) => `${router.basePath}${path}`

  return (
    <Grid
      container
      justifyContent={'center'}
      alignContent={'center'}
      sx={{ height: '100%' }}
    >
      <Grid xs={10} sm={7} md={6} lg={4} sx={{ height: 'fit-content' }}>
        <Definition
          title={'Salvoconducto'}
          subtitle={
            <span>
              [Sal·βo·kon·
              <span
                className="no-style-link duck-link"
                onClick={() =>
                  window.open(
                    'https://9gag.com/tag/duck',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
              >
                <strong>duk</strong>
              </span>
              ·to]
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
