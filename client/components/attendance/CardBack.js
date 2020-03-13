import React from 'react'
import {Card} from 'react-bootstrap'
import {Colors} from '../../utils/board'

const CardBack = ({member}) => {
  const {id, areaGroup, officer} = member
  return (
    <Card className="flip-card-back">
      <Card.Body bsPrefix="tarjeta-body">
        <div className="d-flex flex-row justify-content-between">
          <Card.Subtitle className="mb-2 text-muted">
            {String(id).padStart(4, '0')}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Area {areaGroup}
          </Card.Subtitle>
        </div>
        <div className="d-flex flex-column justify-content-around align-items-center">
          <svg height="30" width="30">
            <circle
              cx="15"
              cy="15"
              r="12"
              stroke="black"
              strokeWidth="2"
              fill={officer === 'Y' ? Colors.officer : Colors.default}
            />
          </svg>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CardBack
