import React from 'react'
import { ListItemButton, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import CustomImage from './CustomImage'
import VisibilityIcon from '@mui/icons-material/Visibility'

import dayjs from 'dayjs'
function truncate(str, n) {
  return (str.length > n) ? str.slice(0, n - 1) + ' (...)' : str;
};
const BORDER_STYLE = {
  border: '1px solid hotpink',
  borderBottom: '2px solid #ff3e9e',
  borderRight: '3px solid #ff3e9e',
  marginTop: '1px'
}

export const CustomListItem = ({
  title,
  description,
  coverSrc,
  date,
  handleClick,
  wasSeen = false,
  withBorder = true
}) => {

  return (
    <ListItemButton
      onClick={handleClick}
      sx={{
        ...withBorder ?
          BORDER_STYLE : {},
      }
      }
    >

      <Stack direction={'column'} alignItems={'center'} spacing={1} width={'100%'}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
          <Typography variant="h6" letterSpacing={'0.3rem'}>
            {title}
            {wasSeen && (
              <VisibilityIcon
                sx={{ mx: 1, fontSize: '0.95rem', color: '#916bb6' }}
              />
            )}
          </Typography>
          <Typography variant="caption" fontWeight={'bold'}>{dayjs(date).format('MMMM YYYY')}</Typography>
        </Stack>
        <CustomImage
          src={coverSrc}
          width={'1500px'}
          height={'1000px'}
          maxHeight={300}
          minHeight={300}
        />
      </Stack>
    </ListItemButton >
  )
}

const CollectionListView = ({ collections, handleClickCollection, wasSeen }) => {
  return (
    <Grid container xs={12} justifyContent={'center'}>
      {collections.map((collection) => (
        <Grid
          key={collection.id}
          xs={12}
          md={6}>
          <CustomListItem
            key={collection.id}
            title={collection.title}
            coverSrc={collection.cover}
            description={collection.description}
            date={collection.date}
            handleClick={() => handleClickCollection(collection)}
            wasSeen={wasSeen(collection.id)}
          />
        </Grid>
      ))}
    </Grid>
  )
}
export default CollectionListView
