import React, {Component} from 'react'
import {NavDropdown} from 'react-bootstrap'

export default class ReportingNav extends Component {
  render() {
    return (
      <NavDropdown title="Reports" id="nav-dropdown" size="lg">
        <NavDropdown.Item eventKey="4.1" href="/reports/absent">
          Absent
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2" href="/reports/complete">
          Complete
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="4.3" disabled>
          R-103 Preview
        </NavDropdown.Item>
      </NavDropdown>
    )
  }
}
