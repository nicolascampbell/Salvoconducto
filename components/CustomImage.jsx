import * as React from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
export default function CustomImage({
  key,
  src,
  width,
  height,
  alt,
  customStyle,
  handleOnClick = () => null
}) {
  return (
    <LazyLoadImage
      key={key}
      src={src}
      width={width}
      height={height}
      alt={alt}
      loading="lazy"
      className="preview-imgs"
      effect="blur"
      onClick={handleOnClick}
      style={customStyle}
    />
  )
}
