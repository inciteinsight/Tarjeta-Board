import React, {Component, Fragment} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {clearSessionThunk} from '../../store'
import {connect} from 'react-redux'

class Confirm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: ''
    }
  }

  handlePasswordChange = e => this.setState({password: e.target.value})

  clearConfirmed = () => ({})

  render() {
    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.secPass ? (
            <Fragment>
              <p>{this.props.message}</p>
              <Form>
                <Form.Group
                  controlId="formBasicPassword"
                  className="d-flex flex-row"
                >
                  <Form.Label>Secretary Password: </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={this.handlePasswordChange}
                  />
                </Form.Group>
              </Form>
            </Fragment>
          ) : (
            <p>{this.props.message}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapState = state => ({
  config: state.attendance.config
})

const mapDispatch = dispatch => ({
  handleClearSession: () => dispatch(clearSessionThunk())
})

export default connect(mapState, mapDispatch)(Confirm)
