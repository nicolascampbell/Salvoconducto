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
  { w: 12, h: 2, x: 2, y: 0, i: '0', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 2, i: '1', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 4, i: '2', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 6, i: '3', moved: false, static: false },
  { w: 6, h: 2, x: 0, y: 8, i: '4', moved: false, static: false },
  { w: 6, h: 2, x: 2, y: 10, i: '5', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 12, i: '6', moved: false, static: false },
  { w: 6, h: 2, x: 2, y: 14, i: '7', moved: false, static: false },
  { w: 6, h: 2, x: 2, y: 16, i: '8', moved: false, static: false },
  { w: 6, h: 2, x: 0, y: 18, i: '9', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 20, i: '10', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 22, i: '11', moved: false, static: false },
  { w: 6, h: 2, x: 2, y: 24, i: '12', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 26, i: '13', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 28, i: '14', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 30, i: '15', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 32, i: '16', moved: false, static: false },
  { w: 6, h: 2, x: 0, y: 34, i: '17', moved: false, static: false },
  { w: 6, h: 2, x: 2, y: 36, i: '18', moved: false, static: false },
  { w: 6, h: 2, x: 2, y: 38, i: '19', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 40, i: '20', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 42, i: '21', moved: false, static: false },
  { w: 6, h: 2, x: 2, y: 44, i: '22', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 46, i: '23', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 48, i: '24', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 50, i: '25', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 52, i: '26', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 54, i: '27', moved: false, static: false },
  { w: 6, h: 2, x: 0, y: 56, i: '28', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 58, i: '29', moved: false, static: false },
  { w: 6, h: 2, x: 2, y: 60, i: '30', moved: false, static: false },
  { w: 6, h: 2, x: 0, y: 62, i: '31', moved: false, static: false },
  { w: 6, h: 2, x: 0, y: 64, i: '32', moved: false, static: false },
  { w: 6, h: 2, x: 4, y: 66, i: '33', moved: false, static: false },
  { w: 6, h: 2, x: 0, y: 68, i: '34', moved: false, static: false }
]
const BREAKPOINTS = { md: 600, xs: 480, xxs: 0 }
const ImageGrid = () => {
  const [layouts, setLayouts] = React.useState(
    generateLayout(BREAKPOINTS, lastFilm.length, { md: lastFilmLg })
  )
  const [breakpoint, setBreakpoint] = React.useState('md')
  function handleItemSizeChange(size, index) {
    console.log(size, index)
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
      cols={{ md: 12, xs: 4, xxs: 2 }}
      rowHeight={10}
      margin={[50, 50]}
      onLayoutChange={handleLayoutChange}
      onBreakpointChange={(breakpoint) => setBreakpoint(breakpoint)}
    >
      {/* lastFilm is an array of objects with src and other stuff about the images*/}
      {lastFilm.map((item, index) => (
        <div key={index} className={'box'}>
          <MeasuredImage
            item={item}
            onSizeChange={(size) => handleItemSizeChange(size, index)}
          />
        </div>
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
