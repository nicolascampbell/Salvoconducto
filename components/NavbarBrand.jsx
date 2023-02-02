import React from 'react'
import {
  useTrail,
  useChain,
  useSprings,
  animated,
  useSpringRef
} from '@react-spring/web'

const COORDS = [
  [45, 30],
  [40, 30],
  [35, 30],
  [30, 30],

  [30, 35],
  [30, 40],

  [35, 40],
  [40, 40],
  [45, 40],

  [45, 45],
  [45, 50],

  [40, 50],
  [35, 50],
  [30, 50]
].map((coord) => coord.map((coordSpec) => coordSpec - 20))

const STROKE_WIDTH = 0.5

const OFFSET = STROKE_WIDTH / 2
const SQUARE_SIZE = 5
const MAX_WIDTH = 8 * SQUARE_SIZE + OFFSET * 2
const MAX_HEIGHT = 9 * SQUARE_SIZE + OFFSET * 2
const Miscellaneous = () => {
  const [open, toggle] = React.useState(true)

  const gridApi = useSpringRef()

  const gridSprings = useTrail(45 / SQUARE_SIZE + 1, {
    ref: gridApi,
    from: {
      x2: 0,
      y2: 0
    },
    to: {
      x2: MAX_WIDTH,
      y2: MAX_HEIGHT
    }
  })

  const boxApi = useSpringRef()

  const [boxSprings] = useSprings(COORDS.length, (i) => ({
    ref: boxApi,
    from: {
      scale: 0
    },
    to: {
      scale: 1
    },
    delay: i * 100,
    config: {
      mass: 2,
      friction: 20
    }
  }))

  useChain([gridApi, boxApi], [0, 1], 1000)

  const handleClick = (isEnter) => {
    boxApi.start((index) => ({
      from: {
        scale: isEnter ? 1 : 0
      },
      to: {
        scale: isEnter ? 0 : 1
      },
      delay: isEnter ? (COORDS.length - index) * 100 : index * 100,
      config: {
        mass: 2,
        friction: 100
      }
    }))
  }

  return (
    <div className="navbar-brand-bg">
      <div
        className="navbar-brand-container"
        onMouseEnter={() => handleClick(true)}
        onMouseLeave={() => handleClick(false)}
      >
        <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
          <g>
            {gridSprings.map(({ x2 }, index) => (
              <animated.line
                x1={0}
                y1={index * SQUARE_SIZE + OFFSET}
                x2={x2}
                y2={index * SQUARE_SIZE + OFFSET}
                key={index}
                strokeWidth={STROKE_WIDTH}
                stroke="currentColor"
              />
            ))}
            {gridSprings.map(({ y2 }, index) => (
              <animated.line
                x1={index * SQUARE_SIZE + OFFSET}
                y1={0}
                x2={index * SQUARE_SIZE + OFFSET}
                y2={y2}
                key={index}
                strokeWidth={STROKE_WIDTH}
                stroke="currentColor"
              />
            ))}
          </g>
          {boxSprings.map(({ scale }, index) => (
            <animated.rect
              key={index}
              width={SQUARE_SIZE}
              height={SQUARE_SIZE}
              fill="currentColor"
              style={{
                transformOrigin: `${5 + OFFSET * 2}px ${5 + OFFSET * 2}px`,
                transform: `translate(${COORDS[index][0] + OFFSET}px, ${
                  COORDS[index][1] + OFFSET
                }px)`,
                scale
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
export default Miscellaneous
