import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateMemberAttendanceThunk} from '../../store'
import {Card, Container} from 'react-bootstrap'
import {Fragment} from 'react'

class CardItem extends Component {
  constructor() {
    super()
    this.state = {
      isPresent: false
    }
  }

  turnover = member => {
    const {isPresent} = this.state
    this.setState({
      isPresent: !isPresent
    })
    this.props.fetchUpdateMemberAttendanceThunk(member.Id)
  }

  cardFront = member => {
    const {color} = this.props.config
    const {isPresent} = this.state
    const {Id, AreaGroup, FirstName, LastName, Officer} = member
    return (
      <Card className={`${!isPresent ? 'bg-light text-dark' : 'text-white'}`}>
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
            <div className="d-flex flex-row justify-content-around align-items-center">
              <h3 className="text-success">PRESENT</h3>
              <svg height="40" width="40">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="black"
                  strokeWidth="3"
                  fill={Officer === 'Y' ? color.officer : color.default}
                />
              </svg>
            </div>
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
      <Container
        bsPrefix="tarjeta-placeholder"
        onClick={() => this.turnover(member)}
      >
        {this.cardFront(member)}
      </Container>
    )
  }
}

const mapState = state => ({
  config: state.attendance.config,
  members: state.attendance.members
})

const mapDispatch = dispatch => ({
  fetchUpdateMemberAttendanceThunk: memberId =>
    dispatch(updateMemberAttendanceThunk(memberId))
})

export default connect(mapState, mapDispatch)(CardItem)
