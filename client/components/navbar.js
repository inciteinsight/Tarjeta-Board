import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Tab, Row, Col, Nav} from 'react-bootstrap'
import {Login, Signup} from '../components'
import Board from './Board'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    {/* <h1>Manhattan Tarjeta Board</h1> */}
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        // <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        //   <Row>
        //     <Col sm={2}>
        //       <Nav variant="pills" className="flex-column">
        //         <Nav.Item>
        //           <Nav.Link eventKey="first">Login</Nav.Link>
        //         </Nav.Item>
        //         <Nav.Item>
        //           <Nav.Link eventKey="second" onClick={handleClick}>Logout</Nav.Link>
        //         </Nav.Item>
        //       </Nav>
        //     </Col>
        //     <Col sm={10}>
        //       <Tab.Content>
        //         <Tab.Pane eventKey="first">
        //           <Board />
        //         </Tab.Pane>
        //         {/* <Tab.Pane eventKey="second">
        //           <Signup/>
        //         </Tab.Pane> */}
        //       </Tab.Content>
        //     </Col>
        //   </Row>
        // </Tab.Container>
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
        // <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        //   <Row>
        //     <Col sm={3}>
        //       <Nav variant="pills" className="flex-column">
        //         <Nav.Item>
        //           <Nav.Link eventKey="first">Login</Nav.Link>
        //         </Nav.Item>
        //         {/* <Nav.Item>
        //           <Nav.Link eventKey="second">Sign Up</Nav.Link>
        //         </Nav.Item> */}
        //       </Nav>
        //     </Col>
        //     <Col sm={9}>
        //       <Tab.Content>
        //         <Tab.Pane eventKey="first">
        //           <Login/>
        //         </Tab.Pane>
        //         <Tab.Pane eventKey="second">
        //           <Signup/>
        //         </Tab.Pane>
        //       </Tab.Content>
        //     </Col>
        //   </Row>
        // </Tab.Container>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
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

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
