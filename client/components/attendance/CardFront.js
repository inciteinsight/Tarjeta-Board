import React from 'react'
import {Card} from 'react-bootstrap'

const CardFront = ({member}) => {
  const {id, areaGroup, firstName, lastName} = member
  return (
    <Card className="flip-card-front">
      <Card.Body bsPrefix="tarjeta-body">
        <div className="d-flex flex-row justify-content-between">
          <Card.Subtitle className="mb-2 text-muted">
            {String(id).padStart(4, '0')}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Area {areaGroup}
          </Card.Subtitle>
        </div>
        <Card.Title>{firstName}</Card.Title>
        <Card.Title>{lastName}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default CardFront
