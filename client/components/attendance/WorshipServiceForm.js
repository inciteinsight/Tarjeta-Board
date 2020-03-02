import React, {Component} from 'react'
import {Form, Button, Carousel} from 'react-bootstrap'
import {setWorshipServiceDateTimeThunk} from '../../store'
import {connect} from 'react-redux'

class WorshipServiceForm extends Component {
  handleSumit = async e => {
    e.preventDefault()
    if (
      this.props.members.reduce((accum, m) => m.hasAttended || accum, false)
    ) {
      console.log('Current has attendances. Please reconfirm and clear first')
    } else {
      console.log(e.target.localSelection.value)
      console.log(e.target.wsDateTime.value)
      await this.props.handleSetWorshipServiceDate(
        new Date(e.target.wsDateTime.value).toISOString()
      )
      console.log('Processing New Service')
    }
  }

  render() {
    return (
      <form
        className="d-flex flex-column justify-content-center"
        onSubmit={this.handleSumit}
      >
        <div className="form-group">
          <label htmlFor="localSelection">Select Local</label>
          <select className="form-control" required name="localSelection">
            <option selected>MNHTN - Local of Manhattan, NY</option>
            <option>LIC - Local of Long Island City, NY</option>
            <option>FRSTH - Local of Forest Hills, NY</option>
            <option>BRONX - Local of Bronx, NY</option>
            <option>BELLM - Local of Bellmore, NY</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="wsDateTime">Worship Service Date and Time</label>
          <input
            type="datetime-local"
            clasSName="form-control"
            id="wsDateTime"
            name="wsDateTime"
            required
          />
        </div>
        <Button type="submit">Create New Worship Service Attendance</Button>
      </form>
    )
  }
}

const mapState = state => ({
  config: state.attendance.config,
  members: state.attendance.members
})

const mapDispatch = dispatch => ({
  handleSetWorshipServiceDate: currentDate =>
    dispatch(setWorshipServiceDateTimeThunk(currentDate))
})

export default connect(mapState, mapDispatch)(WorshipServiceForm)
