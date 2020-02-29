import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Nav} from 'react-bootstrap'
import BoardNav from './nav/BoardNav'
import ReportingNav from './nav/ReportingNav'

const Navbar = ({handleClick, isLoggedIn, currentDate}) => (
  <div>
    <Nav variant="pills" className="justify-content-center" activeKey="/home">
      <Nav.Item className="align-self-center text-success">
        <div>
          {new Date(currentDate).toLocaleTimeString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </Nav.Item>
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

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  currentDate: state.attendance.currentDate
})

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
