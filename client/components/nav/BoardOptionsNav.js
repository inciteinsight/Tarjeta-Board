import React, {Component, Fragment} from 'react'
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
      <Fragment>
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
      </Fragment>
    )
  }
}

const mapDispatch = dispatch => ({
  handleClearSession: () => dispatch(clearSessionThunk())
})

export default connect(null, mapDispatch)(BoardOptionsNav)
