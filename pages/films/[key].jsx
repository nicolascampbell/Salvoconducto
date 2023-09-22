import React from 'react'
import { useRouter } from 'next/router'

import { Unstable_Grid2 as Grid, Button } from '@mui/material' // Grid version 2

import { KeyboardReturn as KeyboardReturnIcon } from '@mui/icons-material'

import { FilmQuickActions } from '@/components/FilmQuickActions'
import ImageList from '@/components/ImageList'
import Definition from '@/components/Definition'
import { getFilmName, getAllFilms, sortFilms, mod } from 'utils'
import { API_URL } from 'utils/config'
export async function getStaticPaths() {
  const resulting = await fetch(`${API_URL}/api/films`)
  const { data } = await resulting.json()
  // Get the paths we want to pre-render based on posts
  const paths = data.map((film, index, films) => ({
    params: {
      key: `${film.attributes.key}`
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
  let { date, location, visible, images, key, comments, filmType } =
    data.attributes
  return { date, location, visible, images, key, comments, filmType }
}
async function getNextPrevFilmKey(filmKey) {
  const films = await getAllFilms()
  const orderedFilms = sortFilms(films, true)
  const currentKeyIndex = orderedFilms.findIndex((film) => film.key === filmKey)
  const getExistingItem = (index) => mod(index, orderedFilms.length)
  const nextFilmKey = orderedFilms[getExistingItem(currentKeyIndex + 1)].key
  const prevFilmKey = orderedFilms[getExistingItem(currentKeyIndex - 1)].key

  return { nextFilmKey, prevFilmKey }
}
export const getStaticProps = async (context) => {
  const film = await getFilmData(context.params.key)
  const { nextFilmKey, prevFilmKey } = await getNextPrevFilmKey(
    context.params.key
  )
  return {
    props: { film, nextFilmKey, prevFilmKey }
  }
}
const Films = ({ film, nextFilmKey, prevFilmKey }) => {
  const router = useRouter()
  const definitions = React.useMemo(() => {
    let tempDef = [`Location ${film.location}`, `Taken on ${film.date}`]
    if (film.filmType) tempDef.push(film.filmType)
    if (film.comments) tempDef.push(film.comments)
    return tempDef
  }, [film.key])
  return (
    <Grid container justifyContent={'center'}>
      <Grid xs={10} lg={6}>
        <Definition
          title={getFilmName(film.key)}
          subtitle={<span>[{getFilmName(film.key)}]</span>}
          type={'Film'}
          definitions={definitions}
          action={
            <Button
              startIcon={<KeyboardReturnIcon />}
              onClick={() => router.push('/films')}
              color='secondary'
            >
              Back to films
            </Button>
          }
        />
      </Grid>
      <Grid xs={12} className="mt-5">
        <ImageList images={film.images.data} filmKey={film.key} />
      </Grid>
      <FilmQuickActions
        goBackAction={router.back}
        nextFilmKey={nextFilmKey}
        prevFilmKey={prevFilmKey}
      />
    </Grid>
  )
}
export default Films
