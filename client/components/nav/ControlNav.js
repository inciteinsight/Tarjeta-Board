import React, {Component} from 'react'
import {NavDropdown} from 'react-bootstrap'

export default class ControlNav extends Component {
  render() {
    return (
      <NavDropdown title="Control" id="nav-dropdown" size="lg">
        <NavDropdown.Item eventKey="6.2" href="/control/members">
          Members
        </NavDropdown.Item>
        {/* <NavDropdown.Item eventKey="6.3" disabled href="/reports/adhoc/form">
          Local
        </NavDropdown.Item> */}
      </NavDropdown>
    )
  }
}
