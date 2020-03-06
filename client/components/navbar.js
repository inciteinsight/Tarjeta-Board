import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  logout,
  updateSecretaryModeThunk,
  getAccessFromSessionThunk,
  importFromSessionThunk
} from '../store'
import {
  Navbar as NavBarComp,
  Nav,
  Alert,
  OverlayTrigger,
  Popover
} from 'react-bootstrap'
import BoardNav from './nav/BoardNav'
import ReportingNav from './nav/ReportingNav'
import PasswordRequest from './misc/PasswordRequest'
import Initialize from './misc/Initialize'
const {secretaryPass} = require('../../secrets')

class Navbar extends Component {
  componentDidMount = () => {
    this.props.fetchAccessFromSession()
    this.props.fetchMembersFromSession()
  }

  toggleSecMode = () => {
    this.props.handleUpdateSecretaryMode()
  }

  handlePasswordChange = e => {
    if (secretaryPass === e.target.value) {
      this.props.handleUpdateSecretaryMode()
    }
  }

  renderServiceDateTime = () => {
    const {reportingPeriod, currentDate} = this.props
    return (
      <h5>
        {reportingPeriod.id === 0
          ? 'Please set Worship Service time'
          : new Date(currentDate).toLocaleTimeString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
      </h5>
    )
  }

  render() {
    const {
      handleClick,
      isLoggedIn,
      currentDate,
      isSecretary,
      locals
    } = this.props
    return !currentDate || locals.length === 0 ? (
      <Initialize />
    ) : (
      <div>
        <NavBarComp bg="dark" variant="dark">
          <Nav
            className="d-flex justify-content-center flex-wrap w-100"
            activeKey="/home"
          >
            <Nav.Item className="align-self-center text-success d-flex align-items-center flex-column">
              <h3>Worship Service:</h3>
              {this.renderServiceDateTime()}
            </Nav.Item>
            {isLoggedIn ? (
              <Fragment>
                <BoardNav />
                {isSecretary ? (
                  <Fragment>
                    <ReportingNav />
                    <Nav.Item>
                      <Nav.Link href="#" onClick={handleClick}>
                        Logout
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={this.toggleSecMode}>
                        Enter WS Mode
                      </Nav.Link>
                    </Nav.Item>
                  </Fragment>
                ) : (
                  <OverlayTrigger
                    trigger="click"
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Popover>
                        <Popover.Content>
                          <PasswordRequest
                            handlePasswordChange={this.handlePasswordChange}
                          />
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <Nav.Item>
                      <Nav.Link>Enter Secretary Mode</Nav.Link>
                    </Nav.Item>
                  </OverlayTrigger>
                )}
                <Nav.Item className="d-flex align-items-center">
                  <Alert
                    style={{marginBottom: 0}}
                    variant={isSecretary ? 'danger' : 'info'}
                    className="align-middle"
                  >
                    {isSecretary ? 'SECRETARY MODE' : 'Worship Service Mode'}
                  </Alert>
                </Nav.Item>
              </Fragment>
            ) : (
              <Fragment>
                <Nav.Item>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
              </Fragment>
            )}
          </Nav>
        </NavBarComp>
        <hr />
      </div>
    )
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  currentDate: state.attendance.currentDate,
  locals: state.local.locals,
  isSecretary: state.secretary.isSecretary,
  reportingPeriod: state.attendance.reportingPeriod
})

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout()),
  handleUpdateSecretaryMode: () => dispatch(updateSecretaryModeThunk()),
  fetchAccessFromSession: () => dispatch(getAccessFromSessionThunk()),
  fetchMembersFromSession: () => dispatch(importFromSessionThunk())
})

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
