import React from 'react'
import { useRouter } from 'next/router'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import Definition from '../components/Definition'
export default function Home() {
  const router = useRouter()
  const getLink = (path) => `${router.basePath}${path}`

  return (
    <Grid container xs={12} justifyContent={'center'}>
      <Grid xs={11} sm={6} md={5} lg={4} sx={{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,50%)' 
      }}>
        <Definition
          title={'Salvoconducto'}
          classes='no-border'
          subtitle={
            <span>
              [Sal·βo·kon·
              <a
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
              </a>
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
