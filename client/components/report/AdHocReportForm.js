import React, {Component, Fragment} from 'react'
import {Button, Form, Container, Row} from 'react-bootstrap'
import {createReportingPeriodThunk} from '../../store'
import {connect} from 'react-redux'
import axios from 'axios'
import history from '../../history'

class AdHocReportForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLocal: 'MANNYUS',
      reportingPeriods: [],
      selectedReportingPeriod: 0
    }
  }

  componentDidMount = () => {
    this.getReportingPeriodsArrayFromLocalId()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.selectedLocal !== this.state.selectedLocal) {
      this.getReportingPeriodsArrayFromLocalId()
    }
  }

  getReportingPeriodsArrayFromLocalId = async () => {
    const {data} = await axios.get(
      `/api/reporting/local/${this.state.selectedLocal}`
    )
    this.setState({
      reportingPeriods: data
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    history.push(`/reports/adhoc/${this.state.selectedReportingPeriod}`)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  localDropdown = () => (
    <select
      className="col-8 form-control"
      required
      name="selectedLocal"
      onChange={this.handleChange}
    >
      {this.props.locals.map(l => (
        <option key={l.id} selected={l.id === 'MANNYUS'} value={l.id}>
          {l.name}
        </option>
      ))}
    </select>
  )

  reportingPeriodDropdown = () => {
    const {reportingPeriods} = this.state
    return (
      <select
        className="col-8 form-control"
        required
        name="selectedReportingPeriod"
        onChange={this.handleChange}
      >
        <option selected value={0}>
          {reportingPeriods.length > 0
            ? 'Select Reporting Period'
            : 'No Reporting Periods Recorded'}
        </option>
        {reportingPeriods.map(r => (
          <option key={r.id} value={r.id}>
            {`${r.serviceType}
             - Week ${r.weekNumber}
             - ${r.year}`}
          </option>
        ))}
      </select>
    )
  }

  render() {
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
              htmlFor="selectedReportingPeriod"
            >
              Select Reporting Period
            </label>
            {this.reportingPeriodDropdown()}
          </div>
          <Row>
            <Button
              type="submit"
              disabled={this.state.selectedReportingPeriod === 0}
            >
              Create Ad Hoc Report
            </Button>
          </Row>
        </Container>
      </Fragment>
    )
  }
}

const mapState = state => ({
  members: state.attendance.members,
  locals: state.local.locals
})

const mapDispatch = dispatch => ({
  fetchCreateReportingPeriod: data => dispatch(createReportingPeriodThunk(data))
})

export default connect(mapState, mapDispatch)(AdHocReportForm)
