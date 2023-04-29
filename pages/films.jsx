import React from 'react'
import {
  Unstable_Grid2 as Grid,
  Divider,
  List,
  Button,
  ListItemButton,
  Box,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Typography
} from '@mui/material' // Grid version 2
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import useLocalStorage from 'use-local-storage'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ArrowUpwardIcon from '@mui/icons-material/North'
import ArrowDownwardIcon from '@mui/icons-material/South'
import Definition from '../components/Definition'
import FilmGrid from '../components/FilmGrid'
import FilmsPreview from '@/components/FilmsPreview'
import { API_URL } from 'utils/config'
import dayjs from 'dayjs'
import { getFilmName } from 'utils'
import produce from 'immer'
const CustomListItem = ({
  name,
  location,
  date,
  handleClick,
  wasSeen = false
}) => (
  <ListItemButton
    onClick={handleClick}
    sx={{
      border: '1px solid hotpink',
      borderBottom: '2px solid #ff3e9e',
      borderRight: '3px solid #ff3e9e',
      marginTop: '1px'
    }}
  >
    <Stack
      direction={'column'}
      justifyContent={'space-between'}
      sx={{ flex: '1 1' }}
    >
      <Typography variant="subtitle1">
        {name}
        {wasSeen && (
          <VisibilityIcon
            sx={{ mx: 1, fontSize: '0.95rem', color: '#916bb6' }}
          />
        )}
      </Typography>
      <Typography variant="caption">{location}</Typography>
    </Stack>
    <Typography variant="body2">{dayjs(date).format('MMMM YYYY')}</Typography>
  </ListItemButton>
)
export const getStaticProps = async () => {
  const resulting = await fetch(`${API_URL}/api/films?populate[1]=cover`)
  const { data } = await resulting.json()

  return {
    props: {
      films: data
        .map((film) => {
          const { date, location, visible, key, cover } = film.attributes
          return { id: film.id, key, date, location, visible, cover }
        })
        .filter((film) => film.visible)
    }
  }
}
const VIEW = {
  LIST: 'LIST',
  GRID: 'GRID'
}
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius
    }
  }
}))

const Films = ({ films }) => {
  const router = useRouter()
  const [view, setView] = React.useState(VIEW.LIST)
  const [orderDesc, setOrderDesc] = useLocalStorage('dateOrder', true)
  const [seenFilms, setSeenFilms] = useLocalStorage('seenFilms', [])
  function handleChangeView(event, nextView) {
    setView(nextView)
  }
  const orderedFilms = React.useMemo(() => {
    return [...films]
      .sort((a, b) => (orderDesc ? a.key - b.key : b.key - a.key))
      .sort((a, b) =>
        orderDesc
          ? Number(new Date(a.date)) - Number(new Date(b.date))
          : Number(new Date(b.date)) - Number(new Date(a.date))
      )
  }, [orderDesc])
  function handleSetSeenFilms(id) {
    setSeenFilms(
      produce((draft) => {
        draft.push(id)
      })
    )
  }
  function handleClickFilm(id) {
    router.push(`/films/${id}`)
    handleSetSeenFilms(id)
  }
  return (
    <Grid container spacing={2}>
      <Grid
        xs={12}
        container
        className={'definition no-padd with-back '}
        spacing={0}
      >
        <Grid xs={10} xsOffset={1} sm={6} smOffset={0} lg={5}>
          <Definition
            title={'Films'}
            subtitle={<span>[Films]</span>}
            type={'Section'}
            definitions={[
              'Bundle of memories.',
              'Chronologically ordered films.'
            ]}
          />
        </Grid>
        <Grid xs={10} xsOffset={1} sm={5} smOffset={0}>
          <FilmsPreview films={orderedFilms} />
        </Grid>
      </Grid>

      <Grid xs={12} container justifyContent={'center'}>
        <Grid
          container
          xs={12}
          lg={8}
          justifyContent={'end'}
          alignContent={'start'}
        >
          <Button
            variant="text"
            size="small"
            sx={{ textTransform: 'none' }}
            color="supportAccent"
            onClick={() => setOrderDesc(!orderDesc)}
            disableElevation
            disableRipple
          >
            Date{' '}
            {orderDesc ? (
              <ArrowUpwardIcon sx={{ width: '0.8rem', height: '0.8rem' }} />
            ) : (
              <ArrowDownwardIcon sx={{ width: '0.8rem', height: '0.8rem' }} />
            )}
          </Button>
          <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
          <StyledToggleButtonGroup
            value={view}
            exclusive
            onChange={handleChangeView}
            size="small"
          >
            <ToggleButton value={VIEW.LIST} aria-label={VIEW.LIST}>
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton value={VIEW.GRID} aria-label={VIEW.GRID}>
              <ViewQuiltIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Grid>
        <Grid xs={12} md={10} lg={8}>
          {view === VIEW.LIST ? (
            <List>
              {orderedFilms.map((film) => (
                <CustomListItem
                  key={film.id}
                  name={getFilmName(film.key)}
                  location={film.location}
                  date={film.date}
                  handleClick={() => handleClickFilm(film.id)}
                  wasSeen={seenFilms.indexOf(film.id) !== -1}
                />
              ))}
            </List>
          ) : (
            <FilmGrid
              films={orderedFilms}
              colsAmount={3}
              handleClickFilm={handleClickFilm}
              wasSeen={(id) => seenFilms.indexOf(id) !== -1}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Films
