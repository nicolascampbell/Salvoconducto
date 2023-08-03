import { Skeleton } from '@mui/material'
import * as React from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'
export default function CustomImage({
  src,
  width,
  height,
  alt,
  customStyle,
  handleOnClick = () => null
}) {
  const [loading, setLoading] = React.useState(true)
  return (
    <div style={{ width: '100%', height: 'auto' }}>
      {loading && (
        <Skeleton
          variant="rounded"
          width={'100%'}
          sx={{
            aspectRatio: width / height
          }}
          className="preview-imgs"
        />
      )}
      <LazyLoadImage
        src={src}
        alt={alt}
        style={{
          ...customStyle,
          aspectRatio: width / height,
          // opacity: loading ? 0 : 1,
          height: loading ? 0 : 'auto'
        }}
        afterLoad={() => setLoading(false)}
        className="preview-imgs"
        // threshold={1000}
        onClick={handleOnClick}
      />
    </div>
  )
}
