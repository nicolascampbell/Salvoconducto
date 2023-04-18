import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import ImageList from './ImageList'
import Measure from 'react-measure'
import produce from 'immer'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
const ResponsiveGridLayout = WidthProvider(Responsive)
const EDIT = false
import { API_URL } from 'utils/config'
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
function generateLayout(breakpoints, size, customLayout) {
  let layoutsArray = Object.keys(breakpoints).map((breakpoint) => {
    return {
      key: breakpoint,
      value: Array.from({ length: size }).map((item, i) => {
        const w = Math.ceil(Math.random() * 4)
        const y = Math.ceil(Math.random() * 4) + 1
        return {
          x: (i * 2) % 12,
          y: Math.floor(i / 6) * y,
          w: 12,
          h: y,
          i: i.toString()
        }
      })
    }
  })
  return layoutsArray.reduce(
    (obj, item) => Object.assign(obj, { [item.key]: item.value }),
    {}
  )
}
const MeasuredImage = ({ item, onSizeChange, minHeight }) => {
  const getLink = (path) => `${path}`
  function handleResize(contentRect) {
    onSizeChange({
      width: contentRect.bounds.width,
      height: contentRect.bounds.height
    })
  }
  console.log(item)
  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <div ref={measureRef} style={{ minHeight: minHeight }}>
          <LazyLoadImage
            src={getLink(item.src)}
            srcSet={getLink(item.src)}
            alt={'Picture of last film'}
            loading="lazy"
            effect="blur"
            className="preview-imgs"
            onClick={() =>
              window.open(getLink(item.src), '_blank', 'noopener,noreferrer')
            }
          />
        </div>
      )}
    </Measure>
  )
}
const CustomGridItemComponent = React.forwardRef(
  (
    {
      style,
      className,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
      customChild,
      children,

      ...props
    },
    ref
  ) => {
    return (
      <div
        style={{ ...style }}
        className={className}
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
      >
        {/* Some other content */}
        {customChild}
        {/* Make sure to include children to add resizable handle */}
        {EDIT && children}
      </div>
    )
  }
)
const BREAKPOINTS = { sm: 700, xs: 480, xxs: 0 }
function purifyApiImages(apiImages) {
  console.log('HIE')
  return apiImages.map((image) => ({
    src: `${API_URL}${image.attributes.url}`,
    height: image.attributes.height,
    width: image.attributes.width,
    id: image.id
  }))
}
const ImageGrid = ({ images }) => {
  const [layouts, setLayouts] = React.useState(
    generateLayout(BREAKPOINTS, images.length)
  )
  console.log(layouts)
  const [breakpoint, setBreakpoint] = React.useState('sm')
  function handleItemSizeChange(size, index) {
    setLayouts(
      produce((draftState) => {
        // From formula pixelHeight = (rowHeight * h) + (marginH * (h - 1))
        // h = (pixelHeight + marginH) / (marginH + rowHeight)
        const newH = (size.height + 25) / (25 + 10)
        draftState[breakpoint][index].h = newH
        // This handles edge cases when container is on max width for screen
        // to not let it make is smaller or bigger
        draftState[breakpoint][index].minH = newH
        draftState[breakpoint][index].maxH = newH
      })
    )
  }
  function handleLayoutChange(layout) {
    console.log({ LAYOUT: layout, BREAKPOINT: breakpoint })
    setLayouts({ ...layouts, [breakpoint]: layout })
  }
  const pureImages = React.useMemo(() => {
    return purifyApiImages(images)
  }, [images])
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={BREAKPOINTS}
      cols={{ sm: 12, xs: 4, xxs: 2 }}
      rowHeight={10}
      margin={[25, 25]}
      onLayoutChange={EDIT ? handleLayoutChange : () => null}
      onBreakpointChange={(breakpoint) => setBreakpoint(breakpoint)}
    >
      {/* lastFilm is an array of objects with src and other stuff about the images*/}
      {pureImages.map((image, index) => (
        <CustomGridItemComponent
          key={image.id}
          className={'box'}
          customChild={
            <img
              key={image.id}
              src={image.src}
              height={image.height}
              width={image.width}
              alt={'Picture of last film'}
              loading="lazy"
              className="preview-imgs"
              onClick={() => setOpen(index)}
            />
          }
        />
      ))}
    </ResponsiveGridLayout>
  )
}

export default ImageGrid
