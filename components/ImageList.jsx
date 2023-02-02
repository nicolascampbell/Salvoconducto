import * as React from 'react'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'

export default function MasonryImageList() {
  const router = useRouter()
  const getLink = (path) => `${router.basePath}${path}`
  const matchesSmallDevices = useMediaQuery('(max-width:768px)')
  return (
    <Box className="d-flex justify-content-center">
      <ImageList variant="masonry" cols={matchesSmallDevices ? 1 : 2} gap={40}>
        {film55.map((item) => (
          <ImageListItem key={item}>
            <img
              src={getLink(item)}
              srcSet={getLink(item)}
              alt={'Picture of last film'}
              loading="lazy"
              className="preview-imgs"
              width={400}
              onClick={() =>
                window.open(getLink(item), '_blank', 'noopener,noreferrer')
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  )
}
const film55 = [
  '/webp/film55/AB000A.webp',
  '/webp/film55/AB001A.webp',
  '/webp/film55/AB005.webp',
  '/webp/film55/AB005A.webp',
  '/webp/film55/AB007.webp',
  '/webp/film55/AB008.webp',
  '/webp/film55/AB009.webp',
  '/webp/film55/AB011.webp',
  '/webp/film55/AB012.webp',
  '/webp/film55/AB013.webp',
  '/webp/film55/AB014.webp',
  '/webp/film55/AB015.webp',
  '/webp/film55/AB016.webp',
  '/webp/film55/AB017.webp',
  '/webp/film55/AB018.webp',
  '/webp/film55/AB019.webp',
  '/webp/film55/AB020.webp',
  '/webp/film55/AB021.webp',
  '/webp/film55/AB022.webp',
  '/webp/film55/AB024.webp',
  '/webp/film55/AB025A.webp',
  '/webp/film55/AB027.webp',
  '/webp/film55/AB028.webp',
  '/webp/film55/AB029.webp',
  '/webp/film55/AB029A.webp',
  '/webp/film55/AB030A.webp',
  '/webp/film55/AB034.webp',
  '/webp/film55/AB035.webp',
  '/webp/film55/AB035A.webp',
  '/webp/film55/AB037.webp',
  '/webp/film55/AB__XA.webp',
  '/webp/film55/AB___XXA.webp'
]
const lastFilm = [
  '/webp/AA001.webp',
  '/webp/AA007.webp',
  '/webp/AA013.webp',
  '/webp/AA019.webp',
  '/webp/AA025.webp',
  '/webp/AA031.webp',
  '/webp/AA002.webp',
  '/webp/AA008.webp',
  '/webp/AA014.webp',
  '/webp/AA020.webp',
  '/webp/AA026.webp',
  '/webp/AA032.webp',
  '/webp/AA003.webp',
  '/webp/AA009.webp',
  '/webp/AA015.webp',
  '/webp/AA021.webp',
  '/webp/AA027.webp',
  '/webp/AA033.webp',
  '/webp/AA004.webp',
  '/webp/AA010.webp',
  '/webp/AA016.webp',
  '/webp/AA022.webp',
  '/webp/AA028.webp',
  '/webp/AA034.webp',
  '/webp/AA005.webp',
  '/webp/AA011.webp',
  '/webp/AA017.webp',
  '/webp/AA023.webp',
  '/webp/AA029.webp',
  '/webp/AA035.webp',
  '/webp/AA006.webp',
  '/webp/AA012.webp',
  '/webp/AA018.webp',
  '/webp/AA024.webp',
  '/webp/AA030.webp'
]
