import * as React from 'react'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import useMediaQuery from '@mui/material/useMediaQuery'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import { flattenFilms, getFilmName } from 'utils'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CustomImage from '@/components/CustomImage'

export default function FilmGridView({
  films,
  colsAmount = 2,
  handleClickFilm,
  wasSeen
}) {
  const matchesSmallDevices = useMediaQuery('(max-width:768px)')
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const flatFilms = React.useMemo(() => {
    return flattenFilms(films)
  }, [films])
  if (!mounted) return null
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
              <CustomImage
                key={film.imageId}
                src={film.src}
                width={'1500px'}
                height={'1000px'}
                alt={'Preview of film' + film.key}
                handleOnClick={() => handleClickFilm(film)}
              />

              <ImageListItemBar
                position="bottom"
                title={getFilmName(film.key)}
                actionIcon={
                  wasSeen(film.key) && (
                    <VisibilityIcon
                      sx={{ mx: 1, fontSize: '0.95rem', color: '#916bb6' }}
                    />
                  )
                }
                subtitle={film.date}
              />
            </ImageListItem>
          )
        })}
      </ImageList>
    </Box>
  )
}
