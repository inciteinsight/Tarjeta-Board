import React, {Component} from 'react'
import {Card, Container} from 'react-bootstrap'
import {Fragment} from 'react'

export default class CardItem extends Component {
  constructor() {
    super()
    this.state = {
      isPresent: false
    }
  }

  turnover = () => {
    const {isPresent} = this.state
    this.setState({
      isPresent: !isPresent
    })
  }

  cardFront = member => {
    const {isPresent} = this.state
    const {Id, AreaGroup, FirstName, LastName, CFO, Officer} = member
    return (
      <Card onClick={() => this.turnover()}>
        <Card.Body bsPrefix="tarjeta-body">
          <div className="d-flex flex-row justify-content-between">
            <Card.Subtitle className="mb-2 text-muted">{Id}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Area {AreaGroup}
            </Card.Subtitle>
          </div>
          {!isPresent ? (
            <Fragment>
              <Card.Title>{FirstName}</Card.Title>
              <Card.Title>{LastName}</Card.Title>
            </Fragment>
          ) : (
            <Fragment>
              <Card.Title>{CFO}</Card.Title>
              {/* change to shapes and circles */}
              <Card.Title>{Officer}</Card.Title>
            </Fragment>
          )}
        </Card.Body>
      </Card>
    )
  }

  empty = () => (
    <Card
      bsPrefix="tarjeta-empty"
      className="d-flex flex-row justify-content-center"
    >
      <div
        style={{border: '5px ridge brown', width: '75%', marginTop: '10%'}}
      />
    </Card>
  )

  render() {
    let {member} = this.props
    return member === 'empty' ? (
      <Container bsPrefix="tarjeta-placeholder">{this.empty()}</Container>
    ) : (
      <Container bsPrefix="tarjeta-placeholder">
        {this.cardFront(member)}
      </Container>
    )
  }
}
