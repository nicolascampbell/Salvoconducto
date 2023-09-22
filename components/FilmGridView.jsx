import * as React from 'react'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import useMediaQuery from '@mui/material/useMediaQuery'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import { flattenFilms, getFilmName } from 'utils'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CustomImage from '@/components/CustomImage'
import { Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { CustomListItem } from './FilmListView'
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
    <React.Fragment>
      <Grid xs={12} container spacing={2}>
        {flatFilms.map((film, index) => {
          return (
            <Grid xs={12} md={6} xl={4} key={film.imageId}>
              <Box
                sx={{
                  border: '1px solid hotpink',
                  borderBottom: '2px solid #ff3e9e',
                  borderRight: '3px solid #ff3e9e',
                  marginTop: '1px'
                }}
              >
                <CustomListItem
                  key={film.imageId}
                  name={getFilmName(film.key)}
                  location={film.location}
                  date={film.date}
                  handleClick={() => handleClickFilm(film)}
                  wasSeen={wasSeen(film.key)}
                  withBorder={false}
                />
                <ImageListItem
                  sx={{
                    borderTop: '1px solid hotpink',
                    aspectRatio:1500/1000
                  }}
                >
                  <CustomImage
                    key={film.imageId}
                    src={film.src}
                    width={'1500px'}
                    height={'1000px'}
                    alt={'Preview of film' + film.key}
                    handleOnClick={() => handleClickFilm(film)}
                  />
                </ImageListItem>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </React.Fragment>
  )
}
