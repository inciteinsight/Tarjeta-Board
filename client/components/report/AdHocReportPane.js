import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {CFO} from '../../utils/board'

class AdHocReportPane extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showDetails: true
    }
  }

  isCurrentService = () => this.props.reportingId === 'current'

  renderCurrentServiceAttendance = member => (
    <td className={`${member.hasAttended ? 'table-success' : 'table-danger'}`}>
      {member.hasAttended ? 'YES' : 'NO'}
    </td>
  )

  // Add Modal Component to edit Attendances

  renderPastAttendances = member => {
    const {services} = this.props
    return (
      <Fragment>
        {services.map(s => {
          const memberAttendance = s.attendances.find(
            a => a.memberId === member.id
          )
          return (
            <td
              key={s.dateTime}
              className={`${
                !memberAttendance
                  ? 'table-secondary'
                  : memberAttendance.hasAttended
                    ? 'table-success'
                    : 'table-danger'
              }`}
            >
              {!memberAttendance
                ? 'N/A'
                : memberAttendance.hasAttended ? 'YES' : 'NO'}
            </td>
          )
        })}
      </Fragment>
    )
  }

  renderHeading = () => {
    const {showDetails} = this.state
    const {services} = this.props
    const dateTimeArray = services.map(s => s.dateTime)
    const servicesHeading = dateTimeArray.map(dateTime =>
      new Date(
        new Date(dateTime).getTime() +
          new Date(Date.now()).getTimezoneOffset() * 60000
      ).toLocaleTimeString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    )

    return (
      <thead>
        <tr>
          <th>Id</th>
          <th>Last Name</th>
          <th>First Name</th>
          {showDetails ? (
            <Fragment>
              <th>Local</th>
              <th>Area-Group</th>
              <th>CFO</th>
              <th>Officer</th>
              <th>Gender</th>
            </Fragment>
          ) : (
            <th>Details</th>
          )}
          {this.isCurrentService() ? (
            <th>Attended</th>
          ) : (
            servicesHeading.map(s => <th key={s}>{s}</th>)
          )}
        </tr>
      </thead>
    )
  }

  render() {
    const {showDetails} = this.state
    const {members, locals, services} = this.props

    return !this.props.appInitialized ? (
      <div />
    ) : (
      <table className="blueTable">
        {this.renderHeading()}
        <tbody>
          {members.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.lastName}</td>
              <td>{m.firstName}</td>
              {showDetails ? (
                <Fragment>
                  <td>{locals.find(l => l.id === m.localId).name}</td>
                  <td>{m.areaGroup}</td>
                  <td>{CFO[m.cfo]}</td>
                  <td>{m.officer}</td>
                  <td>{m.gender}</td>
                </Fragment>
              ) : (
                <td className="table-secondary" />
              )}
              {this.isCurrentService()
                ? this.renderCurrentServiceAttendance(m)
                : this.renderPastAttendances(m)}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

const mapState = state => ({
  appInitialized: state.loading.appInitialized,
  locals: state.local.locals
})

export default connect(mapState)(AdHocReportPane)
