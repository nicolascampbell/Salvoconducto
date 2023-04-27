import * as React from 'react'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'
import 'yet-another-react-lightbox/styles.css'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import { flattenFilms, getFilmName } from 'utils'
export default function FilmGrid({ films, colsAmount = 2 }) {
  const [open, setOpen] = React.useState(null)
  const router = useRouter()
  const matchesSmallDevices = useMediaQuery('(max-width:768px)')

  const flatFilms = React.useMemo(() => {
    return flattenFilms(films)
  }, [films])
  return (
    <Box className="d-flex justify-content-center">
      <ImageList
        variant="masonry"
        cols={matchesSmallDevices ? 1 : colsAmount}
        gap={10}
      >
        {flatFilms.map((film, index) => {
          return (
            <ImageListItem key={film.imageId}>
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
              <ImageListItemBar
                position="bottom"
                title={getFilmName(film.key)}
                subtitle={film.date}
              />
            </ImageListItem>
          )
        })}
      </ImageList>
      <Lightbox
        open={open !== null}
        index={open}
        close={() => setOpen(null)}
        slides={flatFilms}
        plugins={[Zoom]}
      />
    </Box>
  )
}
