import React from 'react'
import {Modal, Button} from 'react-bootstrap'

const Confirm = ({message, title, onHide, buttonMessage, hide, trigger}) => (
  <Modal aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{message}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button
        variant="warning"
        onClick={async () => {
          await trigger()
          hide()
        }}
      >
        {buttonMessage}
      </Button>
      <Button onClick={onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
)

export default Confirm
