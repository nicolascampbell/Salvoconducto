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
  ToggleButton
} from '@mui/material' // Grid version 2
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'

import ViewListIcon from '@mui/icons-material/ViewList'
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import ArrowUpwardIcon from '@mui/icons-material/North'
import ArrowDownwardIcon from '@mui/icons-material/South'
import Definition from '../components/Definition'
import FilmGrid from '../components/FilmGrid'
import FilmsPreview from '@/components/FilmsPreview'
import dayjs from 'dayjs'
const CustomListItem = ({ name, location, date, handleClick }) => (
  <ListItemButton onClick={handleClick}>
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      sx={{ width: '100%' }}
    >
      <span>{name}</span>
      <span>{location}</span>
      <span>{dayjs(date).format('MM/YYYY')}</span>
    </Stack>
  </ListItemButton>
)
export const getStaticProps = async () => {
  const resulting = await fetch(
    `http://localhost:1337/api/films?populate[1]=cover`
  )
  const { data } = await resulting.json()

  return {
    props: {
      films: data
        .map((film) => {
          const { title, date, location, visible, key, cover } = film.attributes
          return { id: film.id, key, title, date, location, visible, cover }
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
  const [orderDesc, setOrderDesc] = React.useState(true)
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

      <Grid xs={12}>
        <Grid container xs={12} justifyContent={'end'} alignContent={'start'}>
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
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {view === VIEW.LIST ? (
            <List>
              {orderedFilms.map((film) => (
                <CustomListItem
                  key={film.id}
                  name={film.title}
                  location={film.location}
                  date={film.date}
                  handleClick={() => router.push(`/films/${film.id}`)}
                />
              ))}
            </List>
          ) : (
            <FilmGrid films={orderedFilms} colsAmount={3} />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}
export default Films
