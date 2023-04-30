import React from 'react'
import { Unstable_Grid2 as Grid, Button } from '@mui/material' // Grid version 2
import ImageList from '@/components/ImageList'
import Definition from '@/components/Definition'
import { API_URL } from 'utils/config'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import {
  North as ArrowUpwardIcon,
  KeyboardReturn as KeyboardReturnIcon
} from '@mui/icons-material'
import BakeryDiningIcon from '@mui/icons-material/BakeryDining'
import { getFilmName } from 'utils'
export const BasicSpeedDial = ({ goBackAction }) => {
  const router = useRouter()
  function handleScrollTop() {
    if (window)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
  }
  const actions = [
    { icon: <ArrowUpwardIcon />, name: 'Top', onClick: handleScrollTop },
    { icon: <KeyboardReturnIcon />, name: 'Back', onClick: goBackAction }
  ]
  return (
    <Box
      sx={{
        height: 320,
        transform: 'translateZ(0px)',
        flexGrow: 1,
        position: 'fixed',
        bottom: 0,
        right: 0
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon icon={<BakeryDiningIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}
export async function getStaticPaths() {
  const resulting = await fetch(`${API_URL}/api/films`)
  const { data } = await resulting.json()
  // Get the paths we want to pre-render based on posts
  const paths = data.map((film, index, films) => ({
    params: {
      key: `${film.key}`
    }
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}
async function getFilmData(filmKey) {
  const resulting = await fetch(`${API_URL}/api/films/${filmKey}?populate=*`)
  let { data } = await resulting.json()
  if (!data) return null
  let { date, location, visible, images, key } = data.attributes
  return { date, location, visible, images, key }
}
export const getStaticProps = async (context) => {
  const props = {}

  props['film'] = await getFilmData(context.params.key)

  return {
    props
  }
}
const Films = ({ film }) => {
  const router = useRouter()
  return (
    <Grid container>
      <Grid xs={4} xsOffset={1} lgOffset={0} container alignContent={'end'}>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => router.push(`/films`)}
        >
          Back
        </Button>
      </Grid>
      <Grid xs={10} xsOffset={1} lg={4} lgOffset={0}>
        <Definition
          title={getFilmName(film.key)}
          subtitle={<span>[{getFilmName(film.key)}]</span>}
          type={'Film'}
          definitions={[`Location ${film.location}`, `Taken on ${film.date}`]}
        />
      </Grid>
      <Grid xs={12} className="mt-5">
        <ImageList images={film.images.data} filmKey={film.key} />
      </Grid>
      <BasicSpeedDial goBackAction={router.back} />
    </Grid>
  )
}
export default Films
