import React from 'react'
import { List, ListItemButton, Stack, Typography } from '@mui/material' // Grid version 2

import VisibilityIcon from '@mui/icons-material/Visibility'

import dayjs from 'dayjs'
import { getFilmName } from 'utils'

const CustomListItem = ({
  name,
  location,
  date,
  handleClick,
  wasSeen = false
}) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
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
}

const FilmListView = ({ films, handleClickFilm, wasSeen }) => {
  return (
    <List>
      {films.map((film) => (
        <CustomListItem
          key={film.key}
          name={getFilmName(film.key)}
          location={film.location}
          date={film.date}
          handleClick={() => handleClickFilm(film)}
          wasSeen={wasSeen(film.key)}
        />
      ))}
    </List>
  )
}
export default FilmListView
