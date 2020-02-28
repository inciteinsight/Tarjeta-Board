import React, {Component} from 'react'
import {NavDropdown} from 'react-bootstrap'

import {connect} from 'react-redux'

export default class BoardNav extends Component {
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
        <NavDropdown.Item eventKey="4.4" disabled>
          Clear Attendance
        </NavDropdown.Item>
      </NavDropdown>
    )
  }
}

// mapDispatch = dispatch => ({
//     handleClearSession: () => dispatch()
// })
