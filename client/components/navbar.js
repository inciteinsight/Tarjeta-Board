import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Nav} from 'react-bootstrap'
import BoardNav from './nav/BoardNav'
import ReportingNav from './nav/ReportingNav'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Nav variant="pills" className="justify-content-center" activeKey="/home">
      {isLoggedIn ? (
        <Fragment>
          <BoardNav />
          <ReportingNav />
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
