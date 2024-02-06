import * as React from 'react'
import Box from '@mui/material/Box'
import { flattenFilms } from 'utils'
import CustomImage from '@/components/CustomImage'
import Carousel from 'react-bootstrap/Carousel'
export default function FilmsPreview({ films }) {
  const flatFilms = React.useMemo(() => {
    return flattenFilms(films)
  }, [films])
  const maxHeight = Math.min(...flatFilms.map(film => film.height))
  return (
    <Box className="d-flex justify-content-center definition no-padd">
      <Carousel
        indicators={false}
        controls={false}
        interval={50}
        fade
        style={{ overflow: 'hidden' }}
      >
        {flatFilms.map((film, index) => {
          return (
            <Carousel.Item key={film.imageId}>
              <CustomImage
                key={film.imageId}
                src={film.src}
                alt={`Preview of film ${ film.key }}`} 
                height={maxHeight}
              />
            </Carousel.Item>
          )
        })}
      </Carousel>
    </Box>
  )
}
