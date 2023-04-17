import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import ImageList from '../../components/ImageList'
import Definition from '../../components/Definition'

export async function getStaticPaths() {
  const resulting = await fetch(`http://localhost:1337/api/films`)
  const { data } = await resulting.json()
  // Get the paths we want to pre-render based on posts
  const paths = data.map((film, index, films) => ({
    params: {
      id: `${film.id}`,
      prevId: index > 0 ? films[index - 1] : null,
      nextId: index < films.length - 1 ? films[index + 1] : null
    }
  }))
  console.log(paths)
  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}
async function getFilmData(id) {
  const resulting = await fetch(
    `http://localhost:1337/api/films/${id}?populate=*`
  )
  let { data } = await resulting.json()
  if (!data) return null
  let { title, date, location, visible, images } = data.attributes
  return { title, date, location, visible, images }
}
export const getStaticProps = async (context) => {
  const props = {}

  props['film'] = await getFilmData(context.params.id)

  return {
    props
  }
}
const Films = ({ film }) => {
  console.log(film)
  return (
    <Grid container>
      <Grid xs={4} lgOffset={4}>
        <Definition
          title={film.title}
          subtitle={<span>[{film.title}]</span>}
          type={'Film'}
          definitions={[`Location ${film.location}`, `Taken on ${film.date}`]}
        />
      </Grid>{' '}
      <Grid xs={12} className="mt-5">
        <ImageList images={film.images.data} />
      </Grid>
    </Grid>
  )
}
export default Films
