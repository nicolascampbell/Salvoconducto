import * as React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Download from 'yet-another-react-lightbox/plugins/download'
import 'yet-another-react-lightbox/styles.css'
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

  const pureImages = React.useMemo(() => {
    return purifyApiImages(images, filmKey)
  }, [images])
  return (
    <React.Fragment>
      <Grid xs={12} container spacing={2}>
        {pureImages.map((image, index) => {
          return (
            <Grid xs={12} md={6}>
              <CustomImage
                key={image.id}
                src={image.src}
                width={image.width}
                height={image.height}
                alt={'Picture of last film'}
                className="preview-imgs"
                handleOnClick={() => setOpen(index)}
              />
            </Grid>
          )
        })}
      </Grid>
      <Lightbox
        open={open !== null}
        index={open}
        close={() => setOpen(null)}
        slides={pureImages}
        plugins={[Zoom, Download]}
        animation={{ fade: 100, swipe: 250 }}
        controller={{ closeOnBackdropClick: true }}
      />
    </React.Fragment>
  )
}
