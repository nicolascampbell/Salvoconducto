import * as React from 'react'
import Box from '@mui/material/Box'
import { flattenFilms } from 'utils'
import CustomImage from '@/components/CustomImage'
export default function FilmsPreview({ films }) {
  const flatFilms = React.useMemo(() => {
    return flattenFilms(films)
  }, [films])
  const maxHeight = Math.min(...flatFilms.map(film => film.height))
  return (
    <Box className="d-flex justify-content-center definition no-padd">
    </Box>
  )
}
