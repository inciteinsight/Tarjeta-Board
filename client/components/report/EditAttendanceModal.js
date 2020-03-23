import React, {Component} from 'react'
import {Modal, Button, Container, Form} from 'react-bootstrap'
import {connect} from 'react-redux'
import axios from 'axios'
import alertify from 'alertifyjs'
import {GenericDropdown} from '../misc/dropdowns'

class EditAttendanceModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      id: 0,
      memberId: 0,
      firstName: 'Hello',
      lastName: 'Po',
      hasAttended: false,
      code: null,
      notes: null
    }
  }

  componentDidMount = () => {
    this.reset()
  }

  reset = async () => {
    const {selectedAttendance} = this.props
    await this.setState({isLoading: true})
    const {
      id,
      memberId,
      firstName,
      lastName,
      hasAttended,
      code,
      notes
    } = selectedAttendance
    await this.setState({
      id,
      memberId,
      firstName,
      lastName,
      hasAttended,
      code,
      notes
    })
    this.setState({isLoading: false})
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSave = async e => {
    e.preventDefault()
    const {id, hasAttended, code, notes} = this.state
    const {onHide} = this.props
    const dataToSend = {
      id,
      hasAttended,
      code,
      notes
    }
    const res = await axios.put('/api/attendance', dataToSend)
    const {status} = res
    if (status === 200) {
      onHide()
      setTimeout(() => {
        history.go(document.URL.slice(document.URL.indexOf('reports') - 1))
      }, 100)
    } else {
      alertify.error(`Error. Could not save attendance`)
    }
  }

  render() {
    const {onHide, worshipService} = this.props
    const {
      isLoading,
      memberId,
      firstName,
      lastName,
      hasAttended,
      code,
      notes
    } = this.state

    if (isLoading) {
      return <div />
    }

    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            EDIT ATTENDANCE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container
            as={Form}
            className="d-flex flex-column align-items-center"
          >
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="memberId"
              >
                Member ID
              </label>
              <input
                value={memberId}
                type="text"
                className="form-control col-8"
                id="memberId"
                name="memberId"
                required
                disabled
              />
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="worshipService"
              >
                Worship Service
              </label>
              <input
                value={new Date(
                  new Date(worshipService.dateTime).getTime() +
                    new Date(Date.now()).getTimezoneOffset() * 60000
                ).toLocaleTimeString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                type="text"
                className="form-control col-8"
                id="worshipService"
                name="worshipService"
                required
                disabled
              />
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                value={firstName}
                type="text"
                className="form-control col-8"
                id="firstName"
                name="firstName"
                onChange={this.handleChange}
                required
                disabled
              />
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                value={lastName}
                type="text"
                className="form-control col-8"
                id="lastName"
                name="lastName"
                onChange={this.handleChange}
                required
                disabled
              />
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right text-success"
                htmlFor="hasAttended"
              >
                Has Attended
              </label>
              <GenericDropdown
                defaultProperty={hasAttended}
                handleChange={this.handleChange}
                property="hasAttended"
                options={[true, false]}
              />
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="notes"
              >
                Notes
              </label>
              <textarea
                value={notes}
                className="form-control col-8"
                id="notes"
                name="notes"
                onChange={this.handleChange}
                required
              />
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={this.handleSave}>
            Save
          </Button>
          <Button variant="warning" onClick={this.reset}>
            Reset Form
          </Button>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapState = state => ({
  locals: state.local.locals
})

export default connect(mapState)(EditAttendanceModal)
