import React, {Component} from 'react'
import {Card, Container} from 'react-bootstrap'

export default class CardItem extends Component {
  constructor() {
    super()
    this.state = {
      isTurnedOver: false
    }
  }

  cardFront = () => (
    <Card>
      <Card.Body bsPrefix="tarjeta-body">
        <div className="d-flex flex-row justify-content-between">
          <Card.Subtitle className="mb-2 text-muted">######</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Area 2-3</Card.Subtitle>
        </div>
        <Card.Title>ROGER LESTER</Card.Title>
        <Card.Title>PALABASAN</Card.Title>
        {/* <Card.Img variant="top" src="/sample/cfo.jpg" style={{opacity: 0.4}} /> */}
        {/* <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link> */}
        {/* <footer>
          Color Code
      </footer> */}
      </Card.Body>
    </Card>
  )

  cardBack = () => {}

  empty = () => {}

  render() {
    return (
      <Container bsPrefix="tarjeta-placeholder">{this.cardFront()}</Container>
    )
  }
}
