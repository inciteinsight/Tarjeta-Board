import React, {Component, Fragment} from 'react'
import {Modal, Button} from 'react-bootstrap'

class Confirm extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleTrigger = async () => {
    const {trigger, onHide} = this.props
    await trigger()
    onHide()
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
          {buttonMessage ? (
            <Fragment>
              <Button variant="warning" onClick={this.handleTrigger}>
                {buttonMessage}
              </Button>
              <Button onClick={onHide}>Close</Button>
            </Fragment>
          ) : (
            <Button onClick={onHide}>Close</Button>
          )}
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Confirm
