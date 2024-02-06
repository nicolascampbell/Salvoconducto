import { Skeleton } from '@mui/material'
import * as React from 'react'

export default function CustomImage({
  src,
  width=1500,
  height=1000,
  alt,
  customStyle,
  handleOnClick = () => null
}) {
  console.log(src);
  const [loading, setLoading] = React.useState(true)
  const [dimensions, setDimensions] = React.useState({
    width: width,
    height: height
  })
  React.useEffect(() => {
    let img = new Image()
    setLoading(true)

    img.src = src
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height })
      setLoading(false)
    }
  }, [src])
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
      {!loading && (
        <img
          alt={alt}
          // in a way this is a trick, I fetch the image above and then when this element
          // fetches it is already in cache so even though its two req acts like one.
          src={src}
          style={{
            ...customStyle,
            aspectRatio: dimensions.width / dimensions.height
            // opacity: loading ? 0 : 1,
          }}
          className="preview-imgs"
          onClick={handleOnClick}
          width={width}
          height={height}
        />
      )}
    </div>
  )
}
