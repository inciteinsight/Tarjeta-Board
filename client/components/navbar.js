import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Nav, NavDropdown} from 'react-bootstrap'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Nav className="justify-content-center" activeKey="/home">
      {isLoggedIn ? (
        <Fragment>
          <Nav.Item size="lg">
            <Nav.Link href="/home">Attendance Board</Nav.Link>
          </Nav.Item>
          {/* <Link to="/home">Home</Link> */}
          <NavDropdown title="Reports" id="nav-dropdown" size="lg">
            <NavDropdown.Item eventKey="4.1">
              <Link to="/reports/absent">Absent</Link>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">
              <Link to="/reports/complete">Complete</Link>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">R-103 Preview</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="4.4">Save Attendance</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.4">Clear</NavDropdown.Item>
          </NavDropdown>
          <Nav.Item size="lg">
            <Nav.Link href="#" onClick={handleClick}>
              Logout
            </Nav.Link>
          </Nav.Item>
        </Fragment>
      ) : (
        <Fragment>
          <Nav.Item size="lg">
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav.Item>
          {/* <Link to="/signup">Sign Up</Link> */}
        </Fragment>
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
