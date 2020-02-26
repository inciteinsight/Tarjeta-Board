import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Col, Row} from 'react-bootstrap'
import CardItem from './CardItem'
import Loading from '../misc/Loading'

class AreaGroupPane extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  componentDidMount = () => {
    this.setState({
      isLoading: false
    })
  }

  createRow(fill) {
    const {members} = this.props
    return (
      <Row style={{maxHeight: '100'}} noGutters>
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

  createPane() {
    return this.createRow(20)
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? (
      <Loading />
    ) : (
      <div className="d-flex flex-row flex-wrap text-center">
        <Container className="tarjeta-segment">
          <Row noGutters>
            <Col>
              <Container bsPrefix="cork" />
            </Col>
          </Row>
          {this.createPane()}
        </Container>
      </div>
    )
  }
}

const mapState = state => ({
  config: state.attendance.config
})

export default connect(mapState)(AreaGroupPane)
