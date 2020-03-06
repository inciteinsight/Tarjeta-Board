import React, {Component} from 'react'
import {NavDropdown} from 'react-bootstrap'

export default class ReportingNav extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleAdHocService = () => {
    console.log('Selected Ad-Hoc Service')
  }

  handleR103request = () => {
    console.log('Selected R-103 Request')
  }

  render() {
    return (
      <NavDropdown title="Reports" id="nav-dropdown" size="lg">
        {/* <NavDropdown.Item eventKey="4.1" href="/reports/absent">
          Absent
        </NavDropdown.Item> */}
        <NavDropdown.Item eventKey="4.2" href="/reports/adhoc/current">
          Current Service Report
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2" href="/reports/adhoc/form">
          Service Report per Reporting Period
        </NavDropdown.Item>
        <NavDropdown.Item
          eventKey="4.3"
          disabled
          onClick={this.handleR103request}
        >
          R-103 Preview
        </NavDropdown.Item>
      </NavDropdown>
    )
  }
}
