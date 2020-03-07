import React, {Component, Fragment} from 'react'
import {NavDropdown} from 'react-bootstrap'
import {clearSessionThunk} from '../../store'
import ConfirmWithPassword from '../misc/ConfirmWithPassword'
import Confirm from '../misc/Confirm'
import {connect} from 'react-redux'
import axios from 'axios'

class BoardOptionsNav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isConfirming: false,
      isSuccessful: false
    }
  }

  confirmClose = () => this.setState({isConfirming: false})
  confirmSuccess = () => this.setState({isSuccessful: false})

  handleSave = async () => {
    const {reportingPeriod, members, currentDate} = this.props
    console.log('Save Button Pressed')
    const attendance = members.map(m => ({
      reportingId: reportingPeriod.id,
      memberId: m.id,
      dateTime: currentDate,
      hasAttended: m.hasAttended
    }))
    await axios.post('/api/reporting/attendance', attendance)
    await this.props.handleClearSession()
    this.setState({isSuccessful: true})
  }

  render() {
    return (
      <Fragment>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.4" onClick={this.handleSave}>
          Save Attendance
        </NavDropdown.Item>
        <NavDropdown.Item
          eventKey="4.4"
          onClick={() => this.setState({isConfirming: true})}
        >
          Clear Attendance
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="4.5" href="/service/new">
          New WS Attendance
        </NavDropdown.Item>
        <ConfirmWithPassword
          title="Clearing Worship Service Attendance Cache"
          message="Are you sure you want to clear? This cannot be reversed."
          secPass={true}
          show={this.state.isConfirming}
          onHide={this.confirmClose}
          buttonMessage="Clear"
          trigger={this.props.handleClearSession}
        />
        <Confirm
          title="Save Success"
          message="Attendance was saved successfully"
          show={this.state.isSuccessful}
          onHide={this.confirmSuccess}
        />
      </Fragment>
    )
  }
}

const mapState = state => ({
  members: state.attendance.members,
  reportingPeriod: state.attendance.reportingPeriod,
  currentDate: state.attendance.currentDate
})

const mapDispatch = dispatch => ({
  handleClearSession: () => dispatch(clearSessionThunk())
})

export default connect(mapState, mapDispatch)(BoardOptionsNav)
