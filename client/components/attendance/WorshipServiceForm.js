import React, {Component, Fragment} from 'react'
import {Button} from 'react-bootstrap'
import {setWorshipServiceDateTimeThunk} from '../../store'
import {connect} from 'react-redux'
import Confirm from '../misc/Confirm'
import history from '../../history'

class WorshipServiceForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isNotified: false
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

  confirmClose = () => this.setState({isNotified: false})

  render() {
    return (
      <Fragment>
        <form
          className="d-flex flex-column justify-content-center"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="localSelection">Select Congregation</label>
            <select className="form-control" required name="localSelection">
              <option selected>MANNY - Local of Manhattan, NY</option>
              <option>LICNY - Local of Long Island City, NY</option>
              <option>FSHNY - Local of Forest Hills, NY</option>
              <option>BRXNY - Local of Bronx, NY</option>
              <option>BLMNY - Local of Bellmore, NY</option>
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
  members: state.attendance.members
})

const mapDispatch = dispatch => ({
  handleSetWorshipServiceDate: currentDate =>
    dispatch(setWorshipServiceDateTimeThunk(currentDate))
})

export default connect(mapState, mapDispatch)(WorshipServiceForm)
