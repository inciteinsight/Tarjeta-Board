import React, {Component} from 'react'
import {NavDropdown} from 'react-bootstrap'
import {clearSessionThunk} from '../../store'
import {connect} from 'react-redux'
import BoardOptionsNav from './BoardOptionsNav'

class BoardNav extends Component {
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
        {this.props.isSecretary ? <BoardOptionsNav /> : <NavDropdown.Divider />}
      </NavDropdown>
    )
  }
}

const mapState = state => ({
  isSecretary: state.secretary.isSecretary
})

const mapDispatch = dispatch => ({
  handleClearSession: () => dispatch(clearSessionThunk())
})

export default connect(mapState, mapDispatch)(BoardNav)
