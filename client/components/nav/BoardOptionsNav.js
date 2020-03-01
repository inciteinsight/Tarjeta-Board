import React, {Component} from 'react'
import {NavDropdown} from 'react-bootstrap'
import {clearSessionThunk} from '../../store'
import ConfirmWithPassword from '../misc/ConfirmWithPassword'
import {connect} from 'react-redux'

class BoardOptionsNav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isConfirming: false
    }
  }

  confirmClose = () => this.setState({isConfirming: false})

  render() {
    return (
      <NavDropdown title="Board Options" id="nav-dropdown" size="lg">
        <NavDropdown.Item eventKey="4.4" disabled>
          Save Attendance
        </NavDropdown.Item>
        <NavDropdown.Item
          eventKey="4.4"
          onClick={() => this.setState({isConfirming: true})}
        >
          Clear Attendance
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
      </NavDropdown>
    )
  }
}

const mapDispatch = dispatch => ({
  handleClearSession: () => dispatch(clearSessionThunk())
})

export default connect(null, mapDispatch)(BoardOptionsNav)
