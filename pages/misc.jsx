import React from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material' // Grid version 2

import { useRouter } from 'next/router'

import { Stage, Container, Sprite, useTick } from '@pixi/react'

let i = 0
const Duck = ({ movementFunction }) => {
  // states
  const [x, setX] = React.useState(0)
  const [y, setY] = React.useState(0)
  const [rotation, setRotation] = React.useState(0)

  // custom ticker
  useTick((delta) => {
    i += 0.01 * delta

    setX(movementFunction(i) * 50)
    setY(movementFunction(i / 1.5) * 50)
    setRotation(-10 + movementFunction(i / 10 + Math.PI * 2) * 10)
  })

  return (
    <Sprite image="/duck.png" anchor={0.5} x={x} y={y} rotation={rotation} />
  )
}

const Miscellaneous = () => {
  const router = useRouter()
  return (
    <Grid container justifyContent={'center'}>
      <Grid xs={12}>
        <h1 className=" text-center">Miscellaneous Page</h1>
      </Grid>
      <Grid xs={12} className="text-center">
        <h5 className="fw-light">
          Is comming somewhen! I am still working on it!
        </h5>
      </Grid>
      <Grid container xs={12} justifyContent="center">
        <Stage
          width={300}
          height={300}
          options={{ autoDensity: true, backgroundColor: 0x01262a }}
        >
          <Container x={150} y={150}>
            <Duck movementFunction={(number) => Math.cos(number)} />
            <Duck movementFunction={(number) => Math.sin(number)} />
            <Duck movementFunction={(number) => Math.tan(number)} />
            <Duck movementFunction={(number) => Math.tan(-number)} />
          </Container>
        </Stage>{' '}
      </Grid>
    </Grid>
  )
}
export default Miscellaneous
