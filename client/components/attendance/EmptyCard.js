import React from 'react'
import {Card} from 'react-bootstrap'

const EmptyCard = () => (
  <Card
    bsPrefix="tarjeta-empty"
    className="d-flex flex-row justify-content-center"
  >
    <div
      style={{
        border: '5px ridge brown',
        width: '75%',
        marginTop: '10%'
      }}
    />
  </Card>
)

export default EmptyCard
