import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import PasswordRequest from './PasswordRequest'

class ConfirmWithPassword extends Component {
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
    const {secretaryPass} = this.props.config.Settings
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

const mapState = state => ({
  config: state.attendance.config
})

export default connect(mapState)(ConfirmWithPassword)
