import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Navbar as NavBarComp, Nav, Alert} from 'react-bootstrap'
import BoardNav from './nav/BoardNav'
import ReportingNav from './nav/ReportingNav'

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSecretary: true
    }
  }

  toggleSecMode = () => {
    this.setState(prevState => ({isSecretary: !prevState.isSecretary}))
  }

  render() {
    const {isSecretary} = this.state
    const {handleClick, isLoggedIn, currentDate} = this.props
    return (
      <div>
        <NavBarComp bg="dark" variant="dark">
          <Nav
            className="d-flex justify-content-center flex-wrap w-100"
            activeKey="/home"
          >
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
                <Nav.Item>
                  <Nav.Link href="#" onClick={handleClick}>
                    Logout
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={this.toggleSecMode}>
                    {isSecretary ? 'Worship Service Mode' : 'Secretary Mode'}
                  </Nav.Link>
                </Nav.Item>
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
            {/* <Nav.Item as="h5" className="text-danger align-self-center">
            {this.state.isSecretary ? "SECRETARY MODE" : "Worship Service Mode"}
          </Nav.Item> */}
          </Nav>
        </NavBarComp>
        <hr />
      </div>
    )
  }
}
// } () => (

// )

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
