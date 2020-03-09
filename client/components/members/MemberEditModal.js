import React, {Component} from 'react'
import {Modal, Card, Button} from 'react-bootstrap'

export default class MemberModal extends Component {
  render() {
    const {
      id,
      areaGroup,
      lastName,
      firstName,
      cfo,
      officer,
      gender,
      isActive,
      createdAt,
      updatedAt,
      localId
    } = this.props.member
    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{`${firstName} ${lastName}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          {/* {buttonMessage ? (
          <Fragment>
            <Button variant="warning" onClick={this.handleTrigger}>
              {buttonMessage}
            </Button>
            <Button onClick={onHide}>Close</Button>
          </Fragment>
        ) : (
          <Button onClick={onHide}>Close</Button>
        )} */}
        </Modal.Footer>
      </Modal>
    )
  }
}
