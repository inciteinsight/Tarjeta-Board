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

  renderCurrentServiceAttendance = member => {
    const service = member.services[0]

    return (
      <td
        className={`${service.hasAttended ? 'table-success' : 'table-danger'}`}
      >
        {service.hasAttended ? 'YES' : 'NO'}
      </td>
    )
  }

  // Add Modal Component to edit Attendances

  renderPastAttendances = member => {
    const {services} = this.props
    return (
      <Fragment>
        {services.map(s => {
          const memberAttendance = member.services.find(
            a => a.worshipserviceId === s.id
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
    const {attendance, members, locals, services} = this.props
    const attendanceKeys = Object.keys(attendance)

    return !this.props.appInitialized ? (
      <div />
    ) : (
      <table className="blueTable">
        {this.renderHeading()}
        <tbody>
          {attendanceKeys.map(ak => {
            const member = attendance[ak]
            return (
              <tr key={member.memberId}>
                <td>{member.memberId}</td>
                <td>{member.lastName.join(', ')}</td>
                <td>{member.firstName.join(', ')}</td>
                {showDetails ? (
                  <Fragment>
                    <td>
                      {locals
                        .filter(l => member.localId.includes(l.id))
                        .map(l => l.name)
                        .join(', ')}
                    </td>
                    <td>{member.areaGroup.join(', ')}</td>
                    <td>{member.cfo.map(cfo => CFO[cfo]).join(', ')}</td>
                    {/* <td>{CFO[member.cfo].join(', ')}</td> */}
                    <td>{member.officer.join(', ')}</td>
                    <td>{member.gender.join(', ')}</td>
                  </Fragment>
                ) : (
                  <td className="table-secondary" />
                )}
                {this.isCurrentService()
                  ? this.renderCurrentServiceAttendance(member)
                  : this.renderPastAttendances(member)}
              </tr>
            )
          })}
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
