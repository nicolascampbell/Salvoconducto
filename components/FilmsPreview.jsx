import * as React from 'react'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { flattenFilms, getRandomInt } from 'utils'
import Carousel from 'react-bootstrap/Carousel'

export default function FilmsPreview({ films }) {
  const router = useRouter()
  const flatFilms = React.useMemo(() => {
    return flattenFilms(films)
  }, [films])
  return (
    <Box className="d-flex justify-content-center definition no-padd">
      <Carousel controls={false} indicators={false} slide={false}>
        {flatFilms.map((film, index) => {
          return (
            <Carousel.Item key={film.imageId} interval={(getRandomInt(500,1000))}>
              <img
                key={film.imageId}
                src={film.src}
                height={film.height}
                width={film.width}
                alt={'Picture of last film'}
                loading="lazy"
                className="preview-imgs"
                onClick={() => router.push(`/films/${film.id}`)}
              />
            </Carousel.Item>
          )
        })}
      </Carousel>
    </Box>
  )
}
