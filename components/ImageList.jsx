import * as React from 'react'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'
import 'yet-another-react-lightbox/styles.css'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Download from 'yet-another-react-lightbox/plugins/download'
import CustomImage from '@/components/CustomImage'

function purifyApiImages(apiImages, filmKey) {
  return apiImages
    .sort((a, b) => a.attributes.name >= b.attributes.name)
    .map((image) => ({
      src: `/films/${filmKey}/webpLow/${image.attributes.name}`,
      height: image.attributes.height,
      width: image.attributes.width,
      id: image.id
    }))
}

export default function ImageListWrapper({ images, filmKey, colsAmount = 2 }) {
  const [open, setOpen] = React.useState(null)
  const router = useRouter()
  const matchesSmallDevices = useMediaQuery('(max-width:768px)')

  const pureImages = React.useMemo(() => {
    return purifyApiImages(images, filmKey)
  }, [images])
  return (
    <Box className="d-flex justify-content-center">
      <ImageList variant="masonry" gap={20} cols={matchesSmallDevices ? 1 : 2}>
        {pureImages.map((image, index) => {
          return (
            <ImageListItem
              key={image.id}
              sx={{
                display: 'flex',
                justifyContent: 'end'
              }}
            >
              <CustomImage
                key={image.id}
                src={image.src}
                width={image.width}
                alt={'Picture of last film'}
                className="preview-imgs"
                handleOnClick={() => setOpen(index)}
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
        plugins={[Zoom, Download]}
      />
    </Box>
  )
}
