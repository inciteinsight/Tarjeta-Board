import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
import PasswordRequest from './PasswordRequest'
const {secretaryPass} = require('../../../secrets')

export default class ConfirmWithPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: ''
    }
  }

  handlePasswordChange = e => this.setState({password: e.target.value})

  handleTrigger = async () => {
    const {trigger, onHide} = this.props
    if (this.passwordCheck()) {
      await trigger()
      onHide()
    }
  }

  passwordCheck = () => {
    const {password} = this.state
    return password === secretaryPass
  }

  render() {
    const {message, title, onHide, buttonMessage} = this.props
    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
          <PasswordRequest handlePasswordChange={this.handlePasswordChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={this.passwordCheck() ? 'danger' : 'warning'}
            onClick={this.handleTrigger}
          >
            {buttonMessage}
          </Button>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
