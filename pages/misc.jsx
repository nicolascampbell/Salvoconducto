import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'

import YoutubeEmbed from '../components/YoutubeEmbed'
const Miscellaneous = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <h1 className="fw-light text-center">Miscellaneous Page</h1>
        </Col>
        <Col xs={12} className="text-center">
          <h5 className="fw-light">
            Is comming somewhen! Meanwhile you can enjoy some music
          </h5>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 10, offset: 1 }}>
          <YoutubeEmbed embedId="dzSiMeLqkI0" />
        </Col>
      </Row>
    </Container>
  )
}
export default Miscellaneous
