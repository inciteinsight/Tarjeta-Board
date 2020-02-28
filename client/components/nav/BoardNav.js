import React, {Component} from 'react'
import {NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class BoardNav extends Component {
  render() {
    return (
      <NavDropdown title="Attendance Board" id="nav-dropdown" size="lg">
        <NavDropdown.Item eventKey="4.1">
          <Link to="/home/">Complete</Link>
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2">
          <Link to="/home/M">Male</Link>
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2">
          <Link to="/home/F">Female</Link>
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
