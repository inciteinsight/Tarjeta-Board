import React, {Component, Fragment} from 'react'
import {Button, Form, Container, Row} from 'react-bootstrap'
import {setWorshipServiceDateTimeThunk} from '../../store'
import {GetWeekNumber, GetDefaultService} from '../../utils/attendance'
import {connect} from 'react-redux'
import Confirm from '../misc/Confirm'
import Loading from '../misc/Loading'

class WorshipServiceForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isNotified: false,
      selectedWeekNumber: GetWeekNumber(
        new Date(
          new Date(Date.now()).getTime() +
            new Date(Date.now()).getTimezoneOffset() * 60000
        )
      ),
      selectedLocal: 'MANNY',
      selectedDateTime: '',
      selectedServiceType: ''
    }
  }

  loadDefault = async () => {
    const {locals} = this.props
    const {selectedDateTime, selectedServiceType} = this.props
    if (selectedDateTime === '' || selectedDateTime === '') {
      const defaultLocal = await locals.find(l => l.id === 'MANNY')
      const defaultSchedule = GetDefaultService(defaultLocal)
      this.setState({
        selectedServiceType: defaultSchedule.serviceType
      })
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

  handleWeekNumberSelection = e => {
    this.setState({selectedWeekNumber: e.target.value})
  }

  handleDateTimeSelection = e => {
    const local = this.props.locals.find(l => l.id === this.state.selectedLocal)
    const sched = local.schedules.find(s => s.id === Number(e.target.value))
    console.log(sched)
    // this.setState({selectedWeekNumber: GetWeekNumber(new Date(Date.now()))})
  }

  localDropdown = () => (
    <select
      className="col-8 form-control"
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
      <select
        className="col-8 form-control"
        required
        name="timeSelection"
        onChange={this.handleDateTimeSelection}
      >
        <option selected>Select Worship Service Schedule</option>
        {currentLocal.schedules.map(s => (
          <option key={s.id} value={s.id}>
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
    const {locals} = this.props
    if (locals.length === 0) {
      return <Loading />
    } else {
      return (
        <Fragment>
          <Container
            as={Form}
            className="d-flex flex-column align-items-center"
            onSubmit={this.handleSubmit}
          >
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="localSelection"
              >
                Congregation
              </label>
              {this.localDropdown()}
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="timeSelection"
              >
                Autofill from Schedule
              </label>
              {this.serviceTimeDropdown()}
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="wsDateTime"
              >
                Worship Service Date Time
              </label>
              <input
                type="datetime-local"
                className="form-control col-8"
                id="wsDateTime"
                name="wsDateTime"
                required
              />
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="weekNum"
              >
                Week Number
              </label>
              <input
                value={this.state.selectedWeekNumber}
                type="number"
                className="form-control col-8"
                id="weekNum"
                name="weekNum"
                min="1"
                max="52"
                onChange={this.handleWeekNumberSelection}
                required
              />
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="serviceType"
              >
                Service Type
              </label>
              <select
                className="form-control col-8"
                id="serviceType"
                name="serviceType"
                required
              >
                <option selected value="Midweek">
                  Midweek
                </option>
                <option value="Weekend">Weekend</option>
                <option value="CWS">CWS</option>
                <option value="Special">Special</option>
              </select>
            </div>
            <Row>
              <Button type="submit">
                Create New Worship Service Attendance
              </Button>
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
