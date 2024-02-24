import React from 'react'
import { useRouter } from 'next/router'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import useLocalStorage from 'use-local-storage'
import CollectionListView from '@/components/CollectionList'
import Definition from '@/components/Definition'
import { getCollectionsList } from 'utils'
import produce from 'immer'
export const getStaticProps = async () => {
  const collections = await getCollectionsList()
  return {
    props: {
      collections
    }
  }
}
const Collections = ({ collections }) => {
  const [seenCollections, setSeenCollections] = useLocalStorage('configSeenCollections', [])
  const router = useRouter()
  function handleSetSeenCollections(key) {
    setSeenCollections(
      produce((draft) => {
        draft.push(key)
      })
    )
  }
  function handleClickCollection({ id }) {
    router.push({
      pathname: '/collections/[key]',
      query: {
        key: id
      }
    })
    handleSetSeenCollections(id)
  }
  function wasCollectionSeen(id) {
    return seenCollections.indexOf(id) !== -1 || false
  }
  return (
    <Grid container justifyContent={'center'}>
      <Grid xs={12} md={6}>
        <Definition
          title={'Collections'}
          subtitle={"/kəˈlɛ·tkʃənz/"}

          type={'Section'}
          definitions={[
            'Bundle of memories.',
            'Sequence of images denoting a feeling or meaning.'
          ]}
          classes='no-border'
        />
      </Grid>
      <Grid xs={12} className="text-center">
        <CollectionListView
          collections={collections}
          handleClickCollection={handleClickCollection}
          wasSeen={wasCollectionSeen}
        />
      </Grid>
    </Grid>
  )
}
export default Collections
