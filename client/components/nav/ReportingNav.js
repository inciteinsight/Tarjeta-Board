import React, {Component} from 'react'
import {NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class ReportingNav extends Component {
  render() {
    return (
      <NavDropdown title="Reports" id="nav-dropdown" size="lg">
        <NavDropdown.Item eventKey="4.1">
          <Link to="/reports/absent">Absent</Link>
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2">
          <Link to="/reports/complete">Complete</Link>
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="4.3" disabled>
          R-103 Preview
        </NavDropdown.Item>
        <NavDropdown.Divider />
      </NavDropdown>
    )
  }
}
