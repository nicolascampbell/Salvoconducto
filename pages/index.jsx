import React from 'react'
import { useRouter } from 'next/router'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import Definition from '../components/Definition'
export default function Home() {
  const router = useRouter()
  const getLink = (path) => `${router.basePath}${path}`

  return (
    <Definition
      title={'Salvoconducto'}
      classes='no-border home-definition'
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
  )
}
