import React, {Component} from 'react'
import {Form, Button} from 'react-bootstrap'
import {setWorshipServiceDateTime} from '../../store'
import {connect} from 'react-redux'

class WorshipServiceForm extends Component {
  render() {
    return (
      <Form className="d-flex flex-column justify-content-center">
        {/* <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group> */}
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Example select</Form.Label>
          <Form.Control as="select">
            <option selected>MNHTN - Local of Manhattan, NY</option>
            <option>LIC - Local of Long Island City, NY</option>
            <option>FRSTH - Local of Forest Hills, NY</option>
            <option>BRONX - Local of Bronx, NY</option>
            <option>BELLM - Local of Bellmore, NY</option>
          </Form.Control>
        </Form.Group>
        {/* <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Example multiple select</Form.Label>
                    <Form.Control as="select" multiple>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    </Form.Control>
                </Form.Group> */}
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Worship Service Date and Time</Form.Label>
          <input
            type="datetime-local"
            clasSName="form-control"
            name="wsDateTime"
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    )
  }
}

const mapState = state => ({
  config: state.attendance.config
})

const mapDispatch = dispatch => ({
  handleSetWorshipServiceDate: currentDate =>
    dispatch(setWorshipServiceDateTime(currentDate))
})

export default connect(mapState, mapDispatch)(WorshipServiceForm)
