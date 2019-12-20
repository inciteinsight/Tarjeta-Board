import React, {Component} from 'react'
import {Container, Col, Row} from 'react-bootstrap'
import CardItem from './attendance/CardItem'
import {ml, config} from '../../public/sample/121919'

export default class Board extends Component {
  createRow(fill) {
    const {locale, areaGroup} = this.props
    console.log(`Locale -> ${locale} and AG -> ${areaGroup}`)
    let members = ml.filter(
      m => m.AreaGroup === areaGroup && m.LOCAL === locale
    )
    console.log(members)
    return (
      <Row noGutters>
        {members.map(m => (
          <Col key={m.FirstName} sm={6} lg={3}>
            <CardItem member={m} />
          </Col>
        ))}
        {fill > members.length ? (
          new Array(fill - members.length).fill(
            <Col sm={6} lg={3}>
              <CardItem member="empty" />
            </Col>,
            0,
            fill - members.length
          )
        ) : (
          <div />
        )}
      </Row>
    )
  }
  createBoard() {
    return this.createRow(20)
  }
  render() {
    return (
      <div className="d-flex flex-row flex-wrap text-center">
        <Container className="tarjeta-segment">
          <Row noGutters>
            <Col>
              <Container bsPrefix="cork" />
            </Col>
          </Row>
          {this.createBoard()}
        </Container>
      </div>
    )
  }
}
