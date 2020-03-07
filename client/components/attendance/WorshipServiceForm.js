import React, {Component, Fragment} from 'react'
import {Button, Form, Container, Row} from 'react-bootstrap'
import {useAccordionToggle} from 'react-bootstrap/AccordionToggle'
import {createReportingPeriodThunk} from '../../store'
import {GetWeekNumber, GetServiceFromScheduleDay} from '../../utils/attendance'
import {connect} from 'react-redux'
import Confirm from '../misc/Confirm'
import Loading from '../misc/Loading'
import axios from 'axios'

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
      selectedServiceType: '',
      selectedCustomType: 'Special'
    }
  }

  componentDidMount = () => {
    if (this.props.members.filter(m => m.hasAttended).length > 0) {
      this.setState({isNotified: true})
      setTimeout(() => history.back(), 5000)
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    const {
      selectedLocal,
      selectedWeekNumber,
      selectedDateTime,
      selectedServiceType
    } = e.target

    const {data} = await axios.get(
      `/api/reporting/attendance/verify/${selectedDateTime.value}`
    )
    if (
      this.props.members.reduce((accum, m) => m.hasAttended || accum, false)
    ) {
      this.setState({isNotified: true})
    } else if (data) {
      this.setState({isNotified: true})
    } else {
      const serviceType =
        selectedServiceType.value === 'Custom'
          ? this.state.selectedCustomType
          : selectedServiceType.value
      await this.props.fetchCreateReportingPeriod({
        localId: selectedLocal.value,
        currentDate: selectedDateTime.value,
        weekNumber: selectedWeekNumber.value,
        serviceType
      })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDateTimeSelection = e => {
    if (Number(e.target.value) >= 0) {
      const selectedWeekNumber = GetWeekNumber(
        new Date(
          new Date(Date.now()).getTime() +
            new Date(Date.now()).getTimezoneOffset() * 60000
        )
      )
      const local = this.props.locals.find(
        l => l.id === this.state.selectedLocal
      )
      const sched = local.schedules.find(s => s.id === Number(e.target.value))
      const selectedDateTime = GetServiceFromScheduleDay(sched.time, sched.day)
      this.setState({
        selectedWeekNumber,
        selectedDateTime,
        selectedServiceType: sched.serviceType
      })
    }
  }

  localDropdown = () => (
    <select
      className="col-8 form-control"
      required
      name="selectedLocal"
      onChange={this.handleChange}
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
        <option selected value={-1}>
          Select Worship Service Schedule
        </option>
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
    const {
      selectedWeekNumber,
      selectedServiceType,
      selectedDateTime,
      selectedCustomType
    } = this.state
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
                htmlFor="selectedLocal"
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
                htmlFor="selectedDateTime"
              >
                Worship Service Date Time
              </label>
              <input
                value={selectedDateTime}
                type="datetime-local"
                className="form-control col-8"
                id="selectedDateTime"
                name="selectedDateTime"
                onChange={this.handleChange}
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
                value={selectedWeekNumber}
                type="number"
                className="form-control col-8"
                id="selectedWeekNumber"
                name="selectedWeekNumber"
                min="1"
                max="52"
                onChange={this.handleChange}
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
                value={selectedServiceType}
                className="form-control col-8"
                id="selectedServiceType"
                name="selectedServiceType"
                required
                onChange={this.handleServiceChange}
              >
                <option selected value="Midweek">
                  Midweek
                </option>
                <option value="Weekend">Weekend</option>
                <option value="CWS">CWS</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="serviceType"
              >
                Custom Service Type
              </label>
              <input
                disabled={this.state.selectedServiceType !== 'Custom'}
                value={selectedCustomType}
                type="text"
                id="selectedCustomType"
                name="selectedCustomType"
                className="form-control col-8"
                onChange={this.handleChange}
              />
            </div>
            <Row>
              <Button
                type="submit"
                disabled={this.state.selectedDateTime.length < 12}
              >
                Create New Worship Service Attendance
              </Button>
            </Row>
          </Container>
          <Confirm
            title="Failed to create new Worship Service"
            message="There is either already a current instance or this worship service date already exists"
            show={this.state.isNotified}
            onHide={this.confirmClose}
          />
        </Fragment>
      )
    }
  }
}

const mapState = state => ({
  members: state.attendance.members,
  locals: state.local.locals
})

const mapDispatch = dispatch => ({
  fetchCreateReportingPeriod: data => dispatch(createReportingPeriodThunk(data))
})

export default connect(mapState, mapDispatch)(WorshipServiceForm)
