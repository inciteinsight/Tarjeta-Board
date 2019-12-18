import React, {Component} from 'react'
import {Card, Icon, Image, Container} from 'semantic-ui-react'

export default class CardItem extends Component {
  render() {
    return (
      <Card color="red">
        <Card.Content>
          <Card.Meta>
            <span className="info">Area 2-3</span>
            <span className="info Choir">Color Code</span>
          </Card.Meta>
          <Card.Header>ROGER LESTER</Card.Header>
          <Card.Header>PALABASAN</Card.Header>
        </Card.Content>
      </Card>
    )
  }
}
