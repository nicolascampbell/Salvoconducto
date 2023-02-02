import * as React from 'react'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'
function getPhotoWidth(relevance) {
  if (relevance === 0) {
    return '60%'
  } else if (relevance <= 1) {
    return '70%'
  } else if (relevance === 2) {
    return '80%'
  } else {
    return '100%'
  }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
export default function MasonryImageList() {
  const router = useRouter()
  const getLink = (path) => `${router.basePath}${path}`
  const matchesSmallDevices = useMediaQuery('(max-width:768px)')
  return (
    <Box className="d-flex justify-content-center">
      <ImageList variant="masonry" cols={matchesSmallDevices ? 1 : 2} gap={40}>
        {lastFilm.map((item) => (
          <ImageListItem key={item.src}>
            <img
              src={getLink(item.src)}
              srcSet={getLink(item.src)}
              alt={'Picture of last film'}
              loading="lazy"
              className="preview-imgs"
              style={{
                width: getPhotoWidth(
                  item.relevance !== null ? item.relevance : getRandomInt(6)
                )
              }}
              onClick={() =>
                window.open(getLink(item.src), '_blank', 'noopener,noreferrer')
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  )
}
const film55 = [
  { src: '/films/film55/AB000A.webp', relevance: null },
  { src: '/films/film55/AB001A.webp', relevance: null },
  { src: '/films/film55/AB005.webp', relevance: null },
  { src: '/films/film55/AB005A.webp', relevance: null },
  { src: '/films/film55/AB007.webp', relevance: null },
  { src: '/films/film55/AB008.webp', relevance: null },
  { src: '/films/film55/AB009.webp', relevance: null },
  { src: '/films/film55/AB011.webp', relevance: null },
  { src: '/films/film55/AB012.webp', relevance: null },
  { src: '/films/film55/AB013.webp', relevance: null },
  { src: '/films/film55/AB014.webp', relevance: null },
  { src: '/films/film55/AB015.webp', relevance: null },
  { src: '/films/film55/AB016.webp', relevance: null },
  { src: '/films/film55/AB017.webp', relevance: 4 },
  { src: '/films/film55/AB018.webp', relevance: null },
  { src: '/films/film55/AB019.webp', relevance: null },
  { src: '/films/film55/AB020.webp', relevance: null },
  { src: '/films/film55/AB021.webp', relevance: null },
  { src: '/films/film55/AB022.webp', relevance: null },
  { src: '/films/film55/AB024.webp', relevance: null },
  { src: '/films/film55/AB025A.webp', relevance: null },
  { src: '/films/film55/AB027.webp', relevance: null },
  { src: '/films/film55/AB028.webp', relevance: 4 },
  { src: '/films/film55/AB029.webp', relevance: null },
  { src: '/films/film55/AB029A.webp', relevance: null },
  { src: '/films/film55/AB030A.webp', relevance: null },
  { src: '/films/film55/AB034.webp', relevance: null },
  { src: '/films/film55/AB035.webp', relevance: null },
  { src: '/films/film55/AB035A.webp', relevance: null },
  { src: '/films/film55/AB037.webp', relevance: null },
  { src: '/films/film55/AB__XA.webp', relevance: null },
  { src: '/films/film55/AB___XXA.webp', relevance: null }
]
const lastFilm = [
  { src: '/films/last_film/AA001.webp', relevance: 4 },
  { src: '/films/last_film/AA007.webp', relevance: 4 },
  { src: '/films/last_film/AA013.webp', relevance: 4 },
  { src: '/films/last_film/AA019.webp', relevance: 4 },
  { src: '/films/last_film/AA025.webp', relevance: 4 },
  { src: '/films/last_film/AA031.webp', relevance: 4 },
  { src: '/films/last_film/AA002.webp', relevance: 4 },
  { src: '/films/last_film/AA008.webp', relevance: null },
  { src: '/films/last_film/AA014.webp', relevance: null },
  { src: '/films/last_film/AA020.webp', relevance: null },
  { src: '/films/last_film/AA026.webp', relevance: null },
  { src: '/films/last_film/AA032.webp', relevance: null },
  { src: '/films/last_film/AA003.webp', relevance: null },
  { src: '/films/last_film/AA009.webp', relevance: null },
  { src: '/films/last_film/AA015.webp', relevance: null },
  { src: '/films/last_film/AA021.webp', relevance: null },
  { src: '/films/last_film/AA027.webp', relevance: null },
  { src: '/films/last_film/AA033.webp', relevance: null },
  { src: '/films/last_film/AA004.webp', relevance: null },
  { src: '/films/last_film/AA010.webp', relevance: 4 },
  { src: '/films/last_film/AA016.webp', relevance: null },
  { src: '/films/last_film/AA022.webp', relevance: null },
  { src: '/films/last_film/AA028.webp', relevance: null },
  { src: '/films/last_film/AA034.webp', relevance: null },
  { src: '/films/last_film/AA005.webp', relevance: null },
  { src: '/films/last_film/AA011.webp', relevance: null },
  { src: '/films/last_film/AA017.webp', relevance: null },
  { src: '/films/last_film/AA023.webp', relevance: null },
  { src: '/films/last_film/AA029.webp', relevance: null },
  { src: '/films/last_film/AA035.webp', relevance: null },
  { src: '/films/last_film/AA006.webp', relevance: null },
  { src: '/films/last_film/AA012.webp', relevance: 4 },
  { src: '/films/last_film/AA018.webp', relevance: null },
  { src: '/films/last_film/AA024.webp', relevance: null },
  { src: '/films/last_film/AA030.webp', relevance: null }
]
