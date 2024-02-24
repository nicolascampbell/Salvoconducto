import React from 'react'
import { Unstable_Grid2 as Grid, Typography, IconButton, Button } from '@mui/material' // Grid version 2
import ImageGrid from '@/components/ImageGrid'
import { API_URL } from 'utils/config'
import { useRouter } from 'next/router'
import {
  North as ArrowUpwardIcon,
  KeyboardReturn as KeyboardReturnIcon,
} from '@mui/icons-material'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Download from 'yet-another-react-lightbox/plugins/download'
import 'yet-another-react-lightbox/styles.css'
export async function getStaticPaths() {
  const resulting = await fetch(`${API_URL}/api/collections`)
  const { data } = await resulting.json()
  // Get the paths we want to pre-render based on posts
  const paths = data.map((collection, index, films) => ({
    params: {
      key: `${collection.id}`
    }
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}
async function getSingleCollection(collectionId) {
  const resulting = await fetch(`${API_URL}/api/collections/${collectionId}?populate=*`)
  const { data } = await resulting.json()
  if (!data) return null
  return data
}
export const getStaticProps = async (context) => {
  const collection = await getSingleCollection(context.params.key)
  return {
    props: {
      collection
    }
  }
}

function sortImageNames(a, b) {
  return a.split('.')[0] - b.split('.')[0];
}
function purifyApiImages(apiImages, collectionId) {
  return apiImages
    .sort((a, b) => sortImageNames(a.attributes.name, b.attributes.name))
    .map((image) => ({
      src: `/collections/${collectionId}/${image.attributes.name}`,
      height: image.attributes.height,
      width: image.attributes.width,
      id: image.id
    }))
}
const Collection = ({ collection }) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(null)

  function handleScrollTop() {
    if (window)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
  }
  async function updateCollectionLayout(layouts) {
    fetch(`${API_URL}/api/collections/${collection.id}`, {
      method: "PUT",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: { collectionLayouts: layouts } })
    }).then((res) => console.log(res.statusText))
  }

  const pureImages = React.useMemo(() => {
    return purifyApiImages(collection.attributes.images.data, collection.id)
  }, [collection])
  function handleClickImage(index) {
    if (process.env.NEXT_PUBLIC_EDIT_LAYOUT !== "true") setOpen(index)
  }
  return (
    <Grid container>
      <Grid xs={1} alignSelf={'end'}>
        <IconButton onClick={router.back} color='secondary' sx={{ height: '100%' }}>
          <KeyboardReturnIcon fontSize='inherit' />
        </IconButton>
      </Grid>
      <Grid xs={10}>
        <Typography variant='subtitle2' textAlign={'center'} fontWeight={600} >Collection</Typography>
        <Typography variant='h2' textAlign={'center'} fontWeight={500} letterSpacing={'0.4rem'}>{collection.attributes.title}</Typography>
      </Grid>
      <Grid xs={12} padding={0}>
        <ImageGrid handleClickImage={handleClickImage} collectionId={collection.id} description={collection.attributes.description} pureImages={pureImages} savedLayouts={collection.attributes.collectionLayouts} saveLayout={updateCollectionLayout} />
      </Grid>
      <Grid xs={12} display={'flex'} justifyContent={'center'}>
        <Button variant='text' sx={{ textTransform: 'none', letterSpacing: '0.2rem' }} endIcon={<ArrowUpwardIcon />} onClick={handleScrollTop}> Scroll Up</Button>
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
    </Grid>
  )
}
export default Collection
