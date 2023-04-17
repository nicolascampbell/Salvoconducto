import * as React from 'react'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'
import 'yet-another-react-lightbox/styles.css'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import { getRandomInt } from 'utils'
function purifyApiImages(apiImages) {
  console.log('HIE')
  return apiImages.map((image) => ({
    src: `http://localhost:1337${image.attributes.url}`,
    height: image.attributes.height,
    width: image.attributes.width,
    id: image.id
  }))
}
function getPhotoWidth(relevance) {
  if (relevance === 0) {
    return '60%'
  } else if (relevance <= 1) {
    return '70%'
  } else if (relevance === 2) {
    return '80%'
  } else {
    return '100%'
}}
export default function MasonryImageList({ images, colsAmount = 2 }) {
  const [open, setOpen] = React.useState(null)
  const router = useRouter()
  const getLink = (path) => `${router.basePath}${path}`
  const matchesSmallDevices = useMediaQuery('(max-width:768px)')
  console.log(images)

  const pureImages = React.useMemo(() => {
    return purifyApiImages(images)
  }, [images])
  return (
    <Box className="d-flex justify-content-center">
      <ImageList
        variant="masonry"
        gap={10}
      >
        {pureImages.map((image, index) => {
          return (
            <ImageListItem
              key={image.id}
              
              sx={{display:'flex', justifyContent:'end'}}
            >
              <img
                key={image.id}
                src={image.src}
                height={image.height}
                width={image.width}
                alt={'Picture of last film'}
                loading="lazy"
                className="preview-imgs"
                onClick={() => setOpen(index)}
                style={{
                  width: getPhotoWidth(getRandomInt(2,8))
  
                }}
              />
            </ImageListItem>
          )
        })}
      </ImageList>
      <Lightbox
        open={open !== null}
        index={open}
        close={() => setOpen(null)}
        slides={pureImages}
        plugins={[Zoom]}
      />
    </Box>
  )
}
