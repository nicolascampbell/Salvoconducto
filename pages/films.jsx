import React from 'react'
import {
  Unstable_Grid2 as Grid,
  Divider,
  Button,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material' // Grid version 2
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import useLocalStorage from 'use-local-storage'
import {
  ViewList as ViewListIcon,
  ViewQuilt as ViewQuiltIcon,
  North as ArrowUpwardIcon,
  South as ArrowDownwardIcon
} from '@mui/icons-material'

import Definition from '../components/Definition'

import FilmGridView from '@/components/FilmGridView'
import FilmListView from '@/components/FilmListView'
import FilmsPreview from '@/components/FilmsPreview'
import { API_URL } from 'utils/config'
import produce from 'immer'
import { getAllFilms, sortFilms } from 'utils'
export const getStaticProps = async () => {
  const films = await getAllFilms()
  return {
    props: {
      films
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
  const [view, setView] = useLocalStorage('configGridView', VIEW.LIST)
  const [orderDesc, setOrderDesc] = useLocalStorage('configDateOrder', true)
  const [seenFilms, setSeenFilms] = useLocalStorage('configSeenFilms', [])
  function handleChangeView(event, nextView) {
    setView(nextView)
  }
  const orderedFilms = React.useMemo(() => {
    return sortFilms(films, orderDesc)
  }, [orderDesc])
  function handleSetSeenFilms(key) {
    setSeenFilms(
      produce((draft) => {
        draft.push(key)
      })
    )
  }
  function handleClickFilm({ key }) {
    router.push({
      pathname: '/films/[key]',
      query: {
        key: key
      }
    })
    handleSetSeenFilms(key)
  }
  function wasFilmSeen(filmKey) {
    return seenFilms.indexOf(filmKey) !== -1 || false
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
            Date
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
            <FilmListView
              films={orderedFilms}
              handleClickFilm={handleClickFilm}
              wasSeen={wasFilmSeen}
            />
          ) : (
            <FilmGridView
              films={orderedFilms}
              colsAmount={3}
              handleClickFilm={handleClickFilm}
              wasSeen={wasFilmSeen}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Films
