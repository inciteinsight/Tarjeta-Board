import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {updateMemberAttendanceThunk} from '../../store'
import {Card, Container} from 'react-bootstrap'
import EmptyCard from './EmptyCard'
import Confirm from '../misc/Confirm'

class CardItem extends Component {
  constructor() {
    super()
    this.state = {
      isPresent: false,
      isConfirming: false
    }
  }

  componentDidMount = () => {
    this.setState({
      isPresent: this.props.member.hasAttended
    })
  }

  turnover = () => {
    const {isPresent} = this.state
    if (isPresent) {
      this.setState({isConfirming: true})
    } else {
      this.handleAttendanceUpdate()
    }
  }

  handleAttendanceUpdate = () => {
    const {isPresent} = this.state
    const {Id} = this.props.member
    this.props.fetchUpdateMemberAttendanceThunk(Id)
    this.setState({isPresent: !isPresent})
  }

  confirmClose = () => this.setState({isConfirming: false})

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

  render() {
    let {member} = this.props
    return member === 'empty' ? (
      <Container bsPrefix="tarjeta-placeholder">
        <EmptyCard />
      </Container>
    ) : (
      <Container bsPrefix="tarjeta-placeholder" onClick={this.turnover}>
        {this.cardFront(member)}
        <Confirm
          title="Revoking Attendance"
          message={`Are you sure you want to revoke
                  ${member.FirstName} ${member.LastName}'s attendance?`}
          show={this.state.isConfirming}
          onHide={this.confirmClose}
          buttonMessage="Revoke"
          trigger={this.handleAttendanceUpdate}
        />
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
