import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {updateMemberAttendanceThunk} from '../../store'
import {Card, Container} from 'react-bootstrap'
import EmptyCard from './EmptyCard'
import Confirm from '../misc/Confirm'
import {Colors} from '../../utils/board'

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
    const {id} = this.props.member
    this.props.fetchUpdateMemberAttendanceThunk(id)
    this.setState({isPresent: !isPresent})
  }

  confirmClose = () => this.setState({isConfirming: false})

  cardFront = member => {
    const {isPresent} = this.state
    const {id, areaGroup, firstName, lastName, officer} = member
    return (
      <Card className="bg-light text-dark">
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

  cardBack = member => {
    const {isPresent} = this.state
    const {id, areaGroup, firstName, lastName, officer} = member
    return (
      <Card className="bg-light text-dark">
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
            {/* <h3 className="text-success">PRESENT</h3> */}
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

  render = () => {
    let {member} = this.props
    return member === 'empty' ? (
      <Container bsPrefix="tarjeta-placeholder">
        <EmptyCard />
      </Container>
    ) : (
      <Fragment>
        <Container bsPrefix="tarjeta-placeholder" onClick={this.turnover}>
          {this.cardFront(member)}
        </Container>
        <Confirm
          title="Revoking Attendance"
          message={`Are you sure you want to revoke
                  ${member.firstName} ${member.lastName}'s attendance?`}
          show={this.state.isConfirming}
          onHide={this.confirmClose}
          buttonMessage="Revoke"
          trigger={this.handleAttendanceUpdate}
        />
      </Fragment>
    )
  }
}

const mapState = state => ({
  members: state.attendance.members
})

const mapDispatch = dispatch => ({
  fetchUpdateMemberAttendanceThunk: memberId =>
    dispatch(updateMemberAttendanceThunk(memberId))
})

export default connect(mapState, mapDispatch)(CardItem)
