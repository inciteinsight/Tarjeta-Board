import React, {Component} from 'react'
import {NavDropdown} from 'react-bootstrap'
import {clearSessionThunk} from '../../store'
import Confirm from '../misc/Confirm'

import {connect} from 'react-redux'

class BoardNav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isConfirming: false
    }
  }

  confirmClose = () => this.setState({isConfirming: false})

  render() {
    return (
      <NavDropdown title="Attendance Board" id="nav-dropdown" size="lg">
        <NavDropdown.Item eventKey="4.1" href="/home/">
          Complete
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2" href="/home/M">
          Male
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2" href="/home/F">
          Female
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.4" disabled>
          Save Attendance
        </NavDropdown.Item>
        <NavDropdown.Item
          eventKey="4.4"
          onClick={() => this.setState({isConfirming: true})}
        >
          Clear Attendance
        </NavDropdown.Item>
        <Confirm
          title="Clearing Worship Service Attendance Cache"
          message="Are you sure you want to clear? This cannot be reversed."
          secPass={true}
          show={this.state.isConfirming}
          onHide={this.confirmClose}
          trigger={this.props.handleClearSession}
        />
      </NavDropdown>
    )
  }
}

const mapDispatch = dispatch => ({
  handleClearSession: () => dispatch(clearSessionThunk())
})

export default connect(null, mapDispatch)(BoardNav)
