import React, {Component} from 'react'
import {Container, Grid, Card, Icon, Image} from 'semantic-ui-react'

export default class Board extends Component {
  render() {
    return (
      <Container>
        {/* card board */}
        {/* areas */}
        <Grid>
          <Grid.Column width="8">
            <Card>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                  <span className="date">Joined in 2015</span>
                </Card.Meta>
                <Card.Description>
                  Matthew is a musician living in Nashville.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  22 Friends
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width="8">{/* Female Grid */}</Grid.Column>
        </Grid>
      </Container>
    )
  }
}
