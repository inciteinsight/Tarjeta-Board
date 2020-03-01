import React, {Component} from 'react'
import {NavDropdown} from 'react-bootstrap'
import {clearSessionThunk} from '../../store'
import ConfirmWithPassword from '../misc/ConfirmWithPassword'
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
      </NavDropdown>
    )
  }
}

const mapDispatch = dispatch => ({
  handleClearSession: () => dispatch(clearSessionThunk())
})

export default connect(null, mapDispatch)(BoardNav)
