import React from 'react'
import Measure from 'react-measure'
import produce from 'immer'
import { Responsive, WidthProvider } from 'react-grid-layout'
import useMediaQuery from '@mui/material/useMediaQuery'
import 'react-lazy-load-image-component/src/effects/blur.css'
import CustomImage from './CustomImage'
import { SpeedDial, Stack, SpeedDialIcon, SpeedDialAction, Box, Typography } from '@mui/material'
import {
  Save as SaveIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
// THIS DOES NOT WORK
// even though I assign this at the start if there is no saved layout seems like there is smth wrong
// and this config gets ignored
function generateLayout(breakpoints, size, customLayout) {
  let layoutsArray = Object.keys(breakpoints).map((breakpoint) => {
    return {
      key: breakpoint,
      value: Array.from({ length: size }).map((item, i) => {
        const w = Math.ceil(Math.random() * 4) + 1
        const y = Math.ceil(Math.random() * 4) + 1
        return {
          x: (i * 2) % 12,
          y: Math.floor(i / 6) * y,
          w: 16,
          h: 2,
          i: i.toString(),
        }
      })
    }
  })
  return layoutsArray.reduce(
    (obj, item) => Object.assign(obj, { [item.key]: item.value }),
    {}
  )
}
const MeasuredImage = ({ item, onSizeChange, handleClick }) => {
  const getLink = (path) => `${path}`
  function handleResize(contentRect) {
    onSizeChange({
      width: contentRect.bounds.width,
      height: contentRect.bounds.height
    })
  }
  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <div ref={measureRef}>
          <CustomImage
            src={getLink(item.src)}
            alt={'of last film'}
            loading="lazy"
            className="preview-imgs"
            onClick={handleClick}
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
      isEditMode,
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
        {isEditMode && children}
      </div>
    )
  }
)
const BREAKPOINTS = { sm: 700 }

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
const ImageGrid = ({ pureImages, description, handleClickImage, savedLayouts = undefined, saveLayout }) => {
  const [layouts, setLayouts] = React.useState(savedLayouts !== undefined ? savedLayouts : generateLayout(BREAKPOINTS, pureImages.length))
  const matchesSmallDevices = useMediaQuery('(max-width:700px)')
  const [previewMode, setPreviewMode] = React.useState(false)
  const ResponsiveGridLayout = React.useMemo(() => WidthProvider(Responsive), []);
  const isEditMode = React.useMemo(() => !previewMode && process.env.NEXT_PUBLIC_EDIT_LAYOUT === "true", [previewMode, process.env.NEXT_PUBLIC_EDIT_LAYOUT]);
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
  function handleLayoutChange(layout, layouts) {
    setLayouts({ ...layouts, [breakpoint]: layout })
  }
  function handleSaveLayout() {
    saveLayout(layouts)
  }
  function handleTogglePreviewMode() {
    setPreviewMode(!previewMode)
  }
  return (
    <React.Fragment>
      {matchesSmallDevices ?

        <Stack direction='column' spacing={2} marginY={2}>
          {pureImages.map((image, index) => (
            <MeasuredImage
              key={image.id}
              item={image}
              handleClick={() => console.log('hey')}
            />
          ))}
          <Typography variant='body1' fontFamily={'monospace'}>{description}</Typography>
        </Stack> :
        <ResponsiveGridLayout
          className="layout"
          cols={{ sm: 24 }}
          layouts={layouts}
          breakpoints={BREAKPOINTS}
          rowHeight={10}
          items={pureImages.length}
          isDraggable={isEditMode}
          isResizable={isEditMode}
          compactType={null}
          margin={[25, 25]}
          useCSSTransforms={true}
          onLayoutChange={isEditMode ? handleLayoutChange : () => null}
          onBreakpointChange={(breakpoint) => setBreakpoint(breakpoint)}
          resizeHandles={['sw', 'nw', 'se', 'ne']}
          preventCollision
        >
          {/* lastFilm is an array of objects with src and other stuff about the images*/}
          {pureImages.map((image, index) => (
            <CustomGridItemComponent
              key={image.id}
              className={'box'}
              onItemClick={() => handleClickImage(index)}
              isEditMode={isEditMode}
              customChild={
                <MeasuredImage
                  item={image}
                  handleClick={() => handleClickImage(index)}
                  onSizeChange={(size) => handleItemSizeChange(size, index)}
                />
              }
            />
          ))}
          {description &&
            <CustomGridItemComponent
              key={'description'}
              className={'box'}
              isEditMode={!previewMode && process.env.NEXT_PUBLIC_EDIT_LAYOUT}
              customChild={
                <Typography variant='body1' fontFamily={'monospace'}>{description}</Typography>
              }
            />
          }
        </ResponsiveGridLayout>
      }
      {process.env.NEXT_PUBLIC_EDIT_LAYOUT &&
        <Box sx={{ height: 320, position: "fixed", bottom: 0, right: 0 }} >
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            <SpeedDialAction
              key={'preview'}
              icon={<VisibilityIcon />}
              tooltipTitle={`Preview Mode: ${previewMode ? "On" : "Off"}`}
              onClick={handleTogglePreviewMode}
            />
            <SpeedDialAction
              key={'save'}
              icon={<SaveIcon />}
              tooltipTitle={"Save Layout"}
              onClick={handleSaveLayout}
            />
          </SpeedDial>
        </Box>
      }
    </React.Fragment >
  )
}

export default ImageGrid
