import React, {Component, Fragment} from 'react'
import {Button, Accordion} from 'react-bootstrap'
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
    <select
      className="form-control col-8"
      required
      name="localSelection"
      onChange={this.handleLocalSelection}
    >
      {this.props.locals.map(l => (
        <option key={l.id} selected={l.id === 'MANNY'} value={l.id}>
          {l.name}
        </option>
      ))}
    </select>
  )

  serviceTimeDropdown = () => {
    const currentLocal = this.props.locals.find(
      l => l.id === this.state.selectedLocal
    )
    return (
      <select className="form-control col-6" required name="timeSelection">
        {currentLocal.schedules.map((s, i) => (
          <option key={s.id} selected={i === 0} value={s.id}>
            {`${s.serviceType} - ${s.day} -
              ${new Date(
                new Date(`2020-01-01T${s.time}Z`).getTime() +
                  new Date(Date.now()).getTimezoneOffset() * 60000
              ).toLocaleTimeString()}`}
          </option>
        ))}
      </select>
    )
  }

  confirmClose = () => this.setState({isNotified: false})

  render() {
    return this.props.locals.length === 0 ? (
      <Loading />
    ) : (
      <Fragment>
        <form
          className="d-flex flex-column justify-content-center align-items-center"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group row">
            <label className="col-4" htmlFor="localSelection">
              Select Congregation
            </label>
            {this.localDropdown()}
          </div>
          <Accordion className="m-0">
            <div className="form-group row">
              <label className="col-4" htmlFor="timeSelection">
                Select Worship Service Date Time
              </label>
              {this.serviceTimeDropdown()}
              <Accordion.Toggle
                className="btn-sm btn-primary col-2"
                eventKey="0"
              >
                Customize
              </Accordion.Toggle>
            </div>
            <Accordion.Collapse eventKey="0">
              <div className="form-group row">
                <label className="col-4" htmlFor="wsDateTime">
                  Customize Date and Time
                </label>
                <input
                  type="datetime-local"
                  clasSName="form-control col-8"
                  id="wsDateTime"
                  name="wsDateTime"
                  required
                />
              </div>
            </Accordion.Collapse>
          </Accordion>
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
  members: state.attendance.members,
  locals: state.local.locals
})

const mapDispatch = dispatch => ({
  handleSetWorshipServiceDate: currentDate =>
    dispatch(setWorshipServiceDateTimeThunk(currentDate))
})

export default connect(mapState, mapDispatch)(WorshipServiceForm)
