import React, {Component, Fragment} from 'react'
import {Button, Accordion, Form, Container, Row, Col} from 'react-bootstrap'
import {setWorshipServiceDateTimeThunk} from '../../store'
import {connect} from 'react-redux'
import Confirm from '../misc/Confirm'
import Loading from '../misc/Loading'

class WorshipServiceForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isNotified: false,
      selectedLocal: 'MANNY'
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    if (
      this.props.members.reduce((accum, m) => m.hasAttended || accum, false)
    ) {
      this.setState({isNotified: true})
    } else {
      await this.props.handleSetWorshipServiceDate(
        new Date(e.target.wsDateTime.value).toISOString()
      )
    }
  }

  handleLocalSelection = e => {
    this.setState({selectedLocal: e.target.value})
  }

  localDropdown = () => (
    <Form.Control
      as="select"
      required
      name="localSelection"
      onChange={this.handleLocalSelection}
    >
      {this.props.locals.map(l => (
        <option key={l.id} selected={l.id === 'MANNY'} value={l.id}>
          {l.name}
        </option>
      ))}
    </Form.Control>
  )

  serviceTimeDropdown = () => {
    const currentLocal = this.props.locals.find(
      l => l.id === this.state.selectedLocal
    )
    return (
      <Form.Control as="select" required name="timeSelection">
        {currentLocal.schedules.map((s, i) => (
          <option key={s.id} selected={i === 0} value={s.id}>
            {`${s.serviceType} - ${s.day} -
              ${new Date(
                new Date(`2020-01-01T${s.time}Z`).getTime() +
                  new Date(Date.now()).getTimezoneOffset() * 60000
              ).toLocaleTimeString()}`}
          </option>
        ))}
      </Form.Control>
    )
  }

  confirmClose = () => this.setState({isNotified: false})

  render() {
    return this.props.locals.length === 0 ? (
      <Loading />
    ) : (
      <Fragment>
        <Container as={Form} onSubmit={this.handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm="2" controlId="localSelection">
              Congregation
            </Form.Label>
            <Col sm="10">{this.localDropdown()}</Col>
          </Form.Group>
          <Accordion as={Row}>
            <Form.Group as={Row} className="w-100 col-12">
              <Form.Label column sm="2" controlId="timeSelection">
                Worship Service Date Time
              </Form.Label>
              <Col sm="8">{this.serviceTimeDropdown()}</Col>
              <Col sm="2">
                <Accordion.Toggle className="btn-sm btn-primary" eventKey="0">
                  Customize
                </Accordion.Toggle>
              </Col>
            </Form.Group>
            <Accordion.Collapse eventKey="0">
              <Form.Group as={Row}>
                <Form.Label column sm="4" htmlFor="wsDateTime">
                  Customize Date and Time
                </Form.Label>
                <input
                  type="datetime-local"
                  clasSName="form-control col-8"
                  id="wsDateTime"
                  name="wsDateTime"
                  required
                />
              </Form.Group>
            </Accordion.Collapse>
          </Accordion>
          <Row>
            <Button type="submit">Create New Worship Service Attendance</Button>
          </Row>
        </Container>
        <Confirm
          title="Current Attendance Unsaved"
          message="Please save or clear the current attendance"
          show={this.state.isNotified}
          onHide={this.confirmClose}
        />
      </Fragment>
    )
  }
}

const mapState = state => ({
  config: state.attendance.config,
  members: state.attendance.members,
  locals: state.local.locals
})

const mapDispatch = dispatch => ({
  handleSetWorshipServiceDate: currentDate =>
    dispatch(setWorshipServiceDateTimeThunk(currentDate))
})

export default connect(mapState, mapDispatch)(WorshipServiceForm)
