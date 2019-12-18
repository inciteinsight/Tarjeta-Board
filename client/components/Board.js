import React, {Component} from 'react'
import {Container, Grid} from 'semantic-ui-react'
import CardItem from './attendance/CardItem'

export default class Board extends Component {
  render() {
    return (
      <Container>
        {/* card board */}
        {/* areas */}
        <div>
          <Grid stackable columns={4} padded>
            <Grid.Column mobile={16} tablet={5} computer={4} color="brown">
              <CardItem />
              <CardItem />
              <CardItem />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4} color="brown">
              <CardItem />
              <CardItem />
              <CardItem />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4} color="brown">
              <CardItem />
              <CardItem />
              <CardItem />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4} color="brown">
              <CardItem />
              <CardItem />
              <CardItem />
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    )
  }
}
