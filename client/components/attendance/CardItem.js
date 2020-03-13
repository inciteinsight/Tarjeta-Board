import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {updateMemberAttendanceThunk} from '../../store'
import {Container} from 'react-bootstrap'
import CardFront from './CardFront'
import CardBack from './CardBack'
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
    const {id} = this.props.member
    this.props.fetchUpdateMemberAttendanceThunk(id)
    this.setState({isPresent: !isPresent})
  }

  confirmClose = () => this.setState({isConfirming: false})

  render = () => {
    let {member} = this.props
    const {isPresent} = this.state
    return member === 'empty' ? (
      <Container bsPrefix="tarjeta-placeholder">
        <EmptyCard />
      </Container>
    ) : (
      <Fragment>
        <Container bsPrefix="tarjeta-placeholder" onClick={this.turnover}>
          <div className="flip-card">
            <div
              className={`flip-card-inner ${
                isPresent ? 'flip-card-present' : ''
              }`}
            >
              <CardFront member={member} />
              <CardBack member={member} />
            </div>
          </div>
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
