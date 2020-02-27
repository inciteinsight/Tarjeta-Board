import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Nav, NavDropdown} from 'react-bootstrap'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Nav>
      {isLoggedIn ? (
        <div>
          <Link to="/home">Home</Link>
          <NavDropdown title="Reports" id="nav-dropdown">
            <NavDropdown.Item eventKey="4.1">
              <Link to="/reports/absent">Absent</Link>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">
              <Link to="/reports/absent">Complete</Link>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">R-103 Preview</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="4.4">Save Attendance</NavDropdown.Item>
          </NavDropdown>
          <Link to="/reports/didNotAttend">Reports</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </Nav>
    <hr />
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
