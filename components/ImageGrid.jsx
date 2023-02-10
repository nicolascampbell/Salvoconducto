import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2
import ImageList from './ImageList'
import Measure from 'react-measure'
import produce from 'immer'
import { Responsive, WidthProvider } from 'react-grid-layout'
const ResponsiveGridLayout = WidthProvider(Responsive)
const EDIT = false

const lastFilm = [
  { src: '/films/last_film/AA001.webp', relevance: 4 },
  { src: '/films/last_film/AA007.webp', relevance: 4 },
  { src: '/films/last_film/AA013.webp', relevance: 4 },
  { src: '/films/last_film/AA019.webp', relevance: 4 },
  { src: '/films/last_film/AA025.webp', relevance: 4 },
  { src: '/films/last_film/AA031.webp', relevance: 4 },
  { src: '/films/last_film/AA002.webp', relevance: 4 },
  { src: '/films/last_film/AA008.webp', relevance: null },
  { src: '/films/last_film/AA014.webp', relevance: null },
  { src: '/films/last_film/AA020.webp', relevance: null },
  { src: '/films/last_film/AA026.webp', relevance: null },
  { src: '/films/last_film/AA032.webp', relevance: null },
  { src: '/films/last_film/AA003.webp', relevance: null },
  { src: '/films/last_film/AA009.webp', relevance: null },
  { src: '/films/last_film/AA015.webp', relevance: null },
  { src: '/films/last_film/AA021.webp', relevance: null },
  { src: '/films/last_film/AA027.webp', relevance: null },
  { src: '/films/last_film/AA033.webp', relevance: null },
  { src: '/films/last_film/AA004.webp', relevance: null },
  { src: '/films/last_film/AA010.webp', relevance: 4 },
  { src: '/films/last_film/AA016.webp', relevance: null },
  { src: '/films/last_film/AA022.webp', relevance: null },
  { src: '/films/last_film/AA028.webp', relevance: null },
  { src: '/films/last_film/AA034.webp', relevance: null },
  { src: '/films/last_film/AA005.webp', relevance: null },
  { src: '/films/last_film/AA011.webp', relevance: null },
  { src: '/films/last_film/AA017.webp', relevance: null },
  { src: '/films/last_film/AA023.webp', relevance: null },
  { src: '/films/last_film/AA029.webp', relevance: null },
  { src: '/films/last_film/AA035.webp', relevance: null },
  { src: '/films/last_film/AA006.webp', relevance: null },
  { src: '/films/last_film/AA012.webp', relevance: 4 },
  { src: '/films/last_film/AA018.webp', relevance: null },
  { src: '/films/last_film/AA024.webp', relevance: null },
  { src: '/films/last_film/AA030.webp', relevance: null }
]
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
function generateLayout(breakpoints, size, customLayout) {
  let layoutsArray = Object.keys(breakpoints).map((breakpoint) => {
    return {
      key: breakpoint,
      value: customLayout[breakpoint]
        ? customLayout[breakpoint]
        : Array.from({ length: size }).map((item, i) => {
            let y = Math.ceil(Math.random() * 1) + 1
            const x = (getRandomInt(5) * 2 + 1) % 12
            return {
              x: (getRandomInt(6) * 2) % 12,
              y: i,
              w: 6,
              h: 2,
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
const MeasuredImage = ({ item, onSizeChange }) => {
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
          <img
            src={getLink(item.src)}
            srcSet={getLink(item.src)}
            alt={'Picture of last film'}
            loading="lazy"
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
const lastFilmLg = [
  {
    w: 5,
    h: 5.374722290039062,
    x: 0,
    y: 0,
    i: '0',
    minH: 5.374722290039062,
    maxH: 5.374722290039062,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 2,
    h: 2.321111297607422,
    x: 5,
    y: 0,
    i: '1',
    minH: 2.321111297607422,
    maxH: 2.321111297607422,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 7,
    h: 7.406667073567708,
    x: 5,
    y: 2.321111297607422,
    i: '2',
    minH: 7.406667073567708,
    maxH: 7.406667073567708,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 3,
    h: 3.3316668192545573,
    x: 2,
    y: 5.374722290039062,
    i: '3',
    minH: 3.3316668192545573,
    maxH: 3.3316668192545573,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 6.396388753255208,
    x: 0,
    y: 9.72777837117513,
    i: '4',
    minH: 6.396388753255208,
    maxH: 6.396388753255208,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 2,
    h: 4.181666819254557,
    x: 6,
    y: 9.72777837117513,
    i: '5',
    minH: 4.181666819254557,
    maxH: 4.181666819254557,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 2,
    h: 2.321111297607422,
    x: 8,
    y: 9.72777837117513,
    i: '6',
    minH: 2.321111297607422,
    maxH: 2.321111297607422,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 4,
    h: 4.353333536783854,
    x: 8,
    y: 12.048889668782552,
    i: '7',
    minH: 4.353333536783854,
    maxH: 4.353333536783854,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 8,
    h: 8.428333536783855,
    x: 0,
    y: 16.12416712443034,
    i: '8',
    minH: 8.428333536783855,
    maxH: 8.428333536783855,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 8,
    h: 8.428333536783855,
    x: 2,
    y: 39.8683349609375,
    i: '9',
    minH: 8.428333536783855,
    maxH: 8.428333536783855,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 2,
    h: 4.181666819254557,
    x: 8,
    y: 20.75555674235026,
    i: '10',
    minH: 4.181666819254557,
    maxH: 4.181666819254557,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 5,
    h: 5.374722290039062,
    x: 6,
    y: 24.937223561604817,
    i: '11',
    minH: 5.374722290039062,
    maxH: 5.374722290039062,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 13.351944986979166,
    x: 0,
    y: 24.552500661214196,
    i: '12',
    minH: 13.351944986979166,
    maxH: 13.351944986979166,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 3,
    h: 3.3316668192545573,
    x: 0,
    y: 86.15528004964193,
    i: '13',
    minH: 3.3316668192545573,
    maxH: 3.3316668192545573,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 4,
    h: 4.353333536783854,
    x: 8,
    y: 16.402223205566408,
    i: '14',
    minH: 4.353333536783854,
    maxH: 4.353333536783854,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 12,
    h: 12.503333536783854,
    x: 0,
    y: 48.296668497721356,
    i: '15',
    minH: 12.503333536783854,
    maxH: 12.503333536783854,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 5,
    h: 5.374722290039062,
    x: 7,
    y: 117.73389129638672,
    i: '16',
    minH: 5.374722290039062,
    maxH: 5.374722290039062,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 5,
    h: 5.374722290039062,
    x: 6,
    y: 30.31194585164388,
    i: '17',
    minH: 5.374722290039062,
    maxH: 5.374722290039062,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 2,
    h: 4.181666819254557,
    x: 6,
    y: 35.686668141682944,
    i: '18',
    minH: 4.181666819254557,
    maxH: 4.181666819254557,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 12,
    h: 12.503333536783854,
    x: 0,
    y: 67.25555775960287,
    i: '19',
    minH: 12.503333536783854,
    maxH: 12.503333536783854,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 5,
    h: 5.374722290039062,
    x: 7,
    y: 79.75889129638672,
    i: '20',
    minH: 5.374722290039062,
    maxH: 5.374722290039062,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 6.396388753255208,
    x: 6,
    y: 85.13361358642578,
    i: '21',
    minH: 6.396388753255208,
    maxH: 6.396388753255208,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 3,
    h: 6.455555725097656,
    x: 3,
    y: 60.80000203450521,
    i: '22',
    minH: 6.455555725097656,
    maxH: 6.455555725097656,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 6.396388753255208,
    x: 0,
    y: 79.75889129638672,
    i: '23',
    minH: 6.396388753255208,
    maxH: 6.396388753255208,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 3,
    h: 3.3316668192545573,
    x: 3,
    y: 86.15528004964193,
    i: '24',
    minH: 3.3316668192545573,
    maxH: 3.3316668192545573,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 7,
    h: 7.406667073567708,
    x: 0,
    y: 117.73389129638672,
    i: '25',
    minH: 7.406667073567708,
    maxH: 7.406667073567708,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 13.351944986979166,
    x: 6,
    y: 91.53000233968099,
    i: '26',
    minH: 13.351944986979166,
    maxH: 13.351944986979166,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 6.396388753255208,
    x: 0,
    y: 89.48694686889648,
    i: '27',
    minH: 6.396388753255208,
    maxH: 6.396388753255208,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 13.351944986979166,
    x: 0,
    y: 95.88333562215169,
    i: '28',
    minH: 13.351944986979166,
    maxH: 13.351944986979166,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 2,
    h: 2.321111297607422,
    x: 9,
    y: 35.686668141682944,
    i: '29',
    minH: 2.321111297607422,
    maxH: 2.321111297607422,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 12,
    h: 12.503333536783854,
    x: 0,
    y: 125.14055836995442,
    i: '30',
    minH: 12.503333536783854,
    maxH: 12.503333536783854,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 6.396388753255208,
    x: 6,
    y: 60.80000203450521,
    i: '31',
    minH: 6.396388753255208,
    maxH: 6.396388753255208,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 6.396388753255208,
    x: 0,
    y: 109.23528060913085,
    i: '32',
    minH: 6.396388753255208,
    maxH: 6.396388753255208,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 6.396388753255208,
    x: 6,
    y: 104.88194732666015,
    i: '33',
    minH: 6.396388753255208,
    maxH: 6.396388753255208,
    moved: false,
    static: false,
    isDraggable: true
  },
  {
    w: 3,
    h: 6.455555216471354,
    x: 6,
    y: 111.27833607991536,
    i: '34',
    minH: 6.455555216471354,
    maxH: 6.455555216471354,
    moved: false,
    static: false,
    isDraggable: true
  }
].map((item) => ({ ...item, isDraggable: EDIT }))
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

const ImageGrid = () => {
  const [layouts, setLayouts] = React.useState(
    generateLayout(BREAKPOINTS, lastFilm.length, { sm: lastFilmLg })
  )
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
      {lastFilm.map((item, index) => (
        <CustomGridItemComponent
          key={index}
          className={'box'}
          data-grid={lastFilmLg[index]}
          customChild={
            <MeasuredImage
              item={item}
              onSizeChange={(size) => handleItemSizeChange(size, index)}
            />
          }
        />
      ))}
    </ResponsiveGridLayout>
  )
}

export default ImageGrid
