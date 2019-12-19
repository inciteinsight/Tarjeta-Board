import React, {Component} from 'react'
import {Container, Col, Row} from 'react-bootstrap'
import CardItem from './attendance/CardItem'
import {ml, config} from '../../public/sample/121919'

export default class Board extends Component {
  render() {
    let members = ml.filter(m => m.AreaGroup === '1-1' && m.Gender === 'F')
    return (
      <div className="d-flex flex-row flex-wrap text-center">
        <Container className="tarjeta-segment">
          <Row noGutters>
            <Col>
              <Container bsPrefix="cork" />
            </Col>
          </Row>
          <Row noGutters>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem member="empty" />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
          </Row>
          <Row noGutters>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
          </Row>
          <Row noGutters>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
          </Row>
          <Row noGutters>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
          </Row>
          <Row noGutters>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
            <Col sm={6} lg={3}>
              <CardItem />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
