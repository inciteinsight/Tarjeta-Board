import React, {Component} from 'react'
import {Col, Row} from 'react-bootstrap'
import CardItem from './CardItem'

export default class AreaGroupPane extends Component {
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
          <Col key={m.firstName} xs={6} md={3} xl={2}>
            <CardItem member={m} />
          </Col>
        ))}
        {fill > members.length ? (
          new Array(fill - members.length).fill(
            <Col xs={6} md={3} xl={2}>
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
    return this.createRow(24)
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? (
      <div />
    ) : (
      <div className="d-flex flex-row flex-wrap text-center">
        <div className="tarjeta-segment w-100">{this.createPane()}</div>
      </div>
    )
  }
}
