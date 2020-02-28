import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'

class Confirm extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleTrigger = async () => {
    const {trigger, hide} = this.props
    await trigger()
    hide()
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={this.handleTrigger}>
            {buttonMessage}
          </Button>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Confirm
