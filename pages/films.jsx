import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import ImageList from '../components/ImageList'
import Measure from 'react-measure'
import produce from 'immer'
import { Responsive, WidthProvider } from 'react-grid-layout'
const ResponsiveGridLayout = WidthProvider(Responsive)
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
    h: 5.041666666666667,
    x: 0,
    y: 0,
    i: '0',
    minH: 5.041666666666667,
    maxH: 5.041666666666667,

    static: false,
    isDraggable: true
  },
  {
    w: 2,
    h: 2.188055419921875,
    x: 5,
    y: 0,
    i: '1',
    minH: 2.188055419921875,
    maxH: 2.188055419921875,

    static: false,
    isDraggable: true
  },
  {
    w: 7,
    h: 6.951388549804688,
    x: 5,
    y: 2.188055419921875,
    i: '2',
    minH: 6.951388549804688,
    maxH: 6.951388549804688,

    static: false,
    isDraggable: true
  },
  {
    w: 3,
    h: 3.142777760823568,
    x: 2,
    y: 5.041666666666667,
    i: '3',
    minH: 3.142777760823568,
    maxH: 3.142777760823568,

    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 5.996666463216146,
    x: 0,
    y: 9.139443969726562,
    i: '4',
    minH: 5.996666463216146,
    maxH: 5.996666463216146,

    static: false,
    isDraggable: true
  },
  {
    w: 2,
    h: 3.881944274902344,
    x: 6,
    y: 9.139443969726562,
    i: '5',
    minH: 3.881944274902344,
    maxH: 3.881944274902344,

    static: false,
    isDraggable: true
  },
  {
    w: 2,
    h: 2.188055419921875,
    x: 8,
    y: 9.139443969726562,
    i: '6',
    minH: 2.188055419921875,
    maxH: 2.188055419921875,

    static: false,
    isDraggable: true
  },
  {
    w: 4,
    h: 4.086666615804036,
    x: 8,
    y: 11.327499389648438,
    i: '7',
    minH: 4.086666615804036,
    maxH: 4.086666615804036,

    static: false,
    isDraggable: true
  },
  {
    w: 7,
    h: 6.951388549804688,
    x: 5,
    y: 15.414166005452474,
    i: '8',
    minH: 6.951388549804688,
    maxH: 6.951388549804688,

    static: false,
    isDraggable: true
  },
  {
    w: 5,
    h: 5.041666666666667,
    x: 0,
    y: 15.136110432942708,
    i: '9',
    minH: 5.041666666666667,
    maxH: 5.041666666666667,

    static: false,
    isDraggable: true
  },
  {
    w: 2,
    h: 3.881944274902344,
    x: 5,
    y: 22.365554555257162,
    i: '10',
    minH: 3.881944274902344,
    maxH: 3.881944274902344,

    static: false,
    isDraggable: true
  },
  {
    w: 4,
    h: 4.086666615804036,
    x: 1,
    y: 20.177777099609376,
    i: '11',
    minH: 4.086666615804036,
    maxH: 4.086666615804036,

    static: false,
    isDraggable: true
  },
  {
    w: 5,
    h: 10.303611246744792,
    x: 7,
    y: 22.365554555257162,
    i: '12',
    minH: 10.303611246744792,
    maxH: 10.303611246744792,

    static: false,
    isDraggable: true
  },
  {
    w: 5,
    h: 5.041666666666667,
    x: 0,
    y: 31.289165496826175,
    i: '13',
    minH: 5.041666666666667,
    maxH: 5.041666666666667,

    static: false,
    isDraggable: true
  },
  {
    w: 5,
    h: 5.041666666666667,
    x: 2,
    y: 26.247498830159508,
    i: '14',
    minH: 5.041666666666667,
    maxH: 5.041666666666667,

    static: false,
    isDraggable: true
  },
  {
    w: 10,
    h: 9.80499979654948,
    x: 1,
    y: 36.33083216349284,
    i: '15',
    minH: 9.80499979654948,
    maxH: 9.80499979654948,

    static: false,
    isDraggable: true
  },
  {
    w: 4,
    h: 4.086666615804036,
    x: 8,
    y: 114.18916549682616,
    i: '16',
    minH: 4.086666615804036,
    maxH: 4.086666615804036,

    static: false,
    isDraggable: true
  },
  {
    w: 4,
    h: 4.086666615804036,
    x: 8,
    y: 46.135831960042324,
    i: '17',
    minH: 4.086666615804036,
    maxH: 4.086666615804036,

    static: false,
    isDraggable: true
  },
  {
    w: 2,
    h: 3.881944274902344,
    x: 6,
    y: 46.135831960042324,
    i: '18',
    minH: 3.881944274902344,
    maxH: 3.881944274902344,

    static: false,
    isDraggable: true
  },
  {
    w: 12,
    h: 11.715000406901042,
    x: 0,
    y: 50.22249857584636,
    i: '19',
    minH: 11.715000406901042,
    maxH: 11.715000406901042,

    static: false,
    isDraggable: true
  },
  {
    w: 5,
    h: 5.041666666666667,
    x: 7,
    y: 61.9374989827474,
    i: '20',
    minH: 5.041666666666667,
    maxH: 5.041666666666667,

    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 5.996666463216146,
    x: 6,
    y: 66.97916564941407,
    i: '21',
    minH: 5.996666463216146,
    maxH: 5.996666463216146,

    static: false,
    isDraggable: true
  },
  {
    w: 3,
    h: 6.030833435058594,
    x: 2,
    y: 101.24111048380533,
    i: '22',
    minH: 6.030833435058594,
    maxH: 6.030833435058594,

    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 5.996666463216146,
    x: 0,
    y: 61.9374989827474,
    i: '23',
    minH: 5.996666463216146,
    maxH: 5.996666463216146,

    static: false,
    isDraggable: true
  },
  {
    w: 3,
    h: 3.142777760823568,
    x: 3,
    y: 67.93416544596354,
    i: '24',
    minH: 3.142777760823568,
    maxH: 3.142777760823568,

    static: false,
    isDraggable: true
  },
  {
    w: 8,
    h: 7.906388854980468,
    x: 0,
    y: 114.18916549682616,
    i: '25',
    minH: 7.906388854980468,
    maxH: 7.906388854980468,

    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 12.452500406901041,
    x: 6,
    y: 72.97583211263021,
    i: '26',
    minH: 12.452500406901041,
    maxH: 12.452500406901041,

    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 5.996666463216146,
    x: 0,
    y: 71.0769432067871,
    i: '27',
    minH: 5.996666463216146,
    maxH: 5.996666463216146,

    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 12.452500406901041,
    x: 0,
    y: 77.07360967000325,
    i: '28',
    minH: 12.452500406901041,
    maxH: 12.452500406901041,

    static: false,
    isDraggable: true
  },
  {
    w: 2,
    h: 2.188055419921875,
    x: 4,
    y: 46.135831960042324,
    i: '29',
    minH: 2.188055419921875,
    maxH: 2.188055419921875,

    static: false,
    isDraggable: true
  },
  {
    w: 12,
    h: 11.715000406901042,
    x: 0,
    y: 89.52611007690429,
    i: '30',
    minH: 11.715000406901042,
    maxH: 11.715000406901042,

    static: false,
    isDraggable: true
  },
  {
    w: 7,
    h: 6.951388549804688,
    x: 5,
    y: 101.24111048380533,
    i: '31',
    minH: 6.951388549804688,
    maxH: 6.951388549804688,

    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 5.996666463216146,
    x: 0,
    y: 108.19249903361002,
    i: '32',
    minH: 5.996666463216146,
    maxH: 5.996666463216146,

    static: false,
    isDraggable: true
  },
  {
    w: 6,
    h: 5.996666463216146,
    x: 6,
    y: 108.19249903361002,
    i: '33',
    minH: 5.996666463216146,
    maxH: 5.996666463216146,

    static: false,
    isDraggable: true
  },
  {
    w: 3,
    h: 6.030832926432292,
    x: 0,
    y: 124.195277150472,
    i: '34',
    minH: 6.030832926432292,
    maxH: 6.030832926432292,
    moved: false,
    static: false,
    isDraggable: true
  }
].map((item) => ({ ...item, isDraggable: true }))
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
        {children}
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
        const newH = (size.height + 50) / (50 + 10)
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
      margin={[50, 50]}
      onLayoutChange={handleLayoutChange}
      onBreakpointChange={(breakpoint) => setBreakpoint(breakpoint)}
    >
      {/* lastFilm is an array of objects with src and other stuff about the images*/}
      {lastFilm.map((item, index) => (
        <CustomGridItemComponent
          key={index}
          className={'box'}
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

const Films = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <h1 className="fw-light text-center">Films Page</h1>
        </Col>
        <Col xs={12} className="text-center">
          <h5 className="fw-light">
            Is comming soon! Meanwhile you can look at some pictures
          </h5>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <ImageGrid />
        </Col>
      </Row>
    </Container>
  )
}
export default Films
