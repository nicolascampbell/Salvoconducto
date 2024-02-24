import React from 'react'
import { ListItemButton, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import CustomImage from './CustomImage'
import VisibilityIcon from '@mui/icons-material/Visibility'

import dayjs from 'dayjs'
function truncate(str, n) {
  return (str.length > n) ? str.slice(0, n - 1) + ' (...)' : str;
};
const BORDER_STYLE = {
  border: '3px solid #ff3e9e',
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
        <Grid container xs={12} justifyContent={'space-between'} alignItems={'center'} >
          <Grid xs={12} sm={10}>
            <Typography variant="h6" letterSpacing={'0.2rem'}>
              {title}
              {wasSeen && (
                <VisibilityIcon
                  sx={{ mx: 1, fontSize: '0.95rem', color: '#916bb6' }}
                />
              )}
            </Typography>
          </Grid>
          <Grid xs={12} sm={2}
            textAlign={{ xs: 'start', sm: 'end', }}
          >
            <Typography variant="caption"
              fontWeight={'bold'}
              textAlign={{ xs: 'start', sm: 'end', }}
            >
              {dayjs(date).format('MMMM YYYY')}
            </Typography>

          </Grid>
        </Grid>
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
