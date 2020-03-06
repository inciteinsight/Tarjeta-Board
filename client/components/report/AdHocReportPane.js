import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Loading from '../misc/Loading'
import {CFO} from '../../utils/board'

class AdHocReportPane extends Component {
  isCurrentService = () => this.props.reportingId === 'current'

  renderCurrentServiceAttendance = member => (
    <td className={`${member.hasAttended ? 'table-success' : 'table-danger'}`}>
      {member.hasAttended ? 'YES' : 'NO'}
    </td>
  )

  renderPastAttendances = member => {
    const {services, attendance} = this.props
    const memberAttendances = attendance.filter(a => a.memberId === member.id)
    return (
      <Fragment>
        {services.map(s => {
          const hasAttendedService = memberAttendances.find(
            m => m.dateTime === s
          ).hasAttended
          return (
            <td
              key={s}
              className={`${
                hasAttendedService ? 'table-success' : 'table-danger'
              }`}
            >
              {hasAttendedService ? 'YES' : 'NO'}
            </td>
          )
        })}
      </Fragment>
    )
  }

  render() {
    const {members, locals, services} = this.props
    let memberKeys = Object.keys(members[0]).filter(
      k => k !== 'createdAt' && k !== 'updatedAt' && k !== 'isActive'
    )
    let heading = [
      'Id',
      'Area-Group',
      'Last Name',
      'First Name',
      'CFO',
      'Officer',
      'Gender',
      'Local'
    ]
    if (this.isCurrentService()) {
      heading.push('Attended')
    } else {
      const servicesHeading = services.map(s =>
        new Date(
          new Date(s).getTime() +
            new Date(Date.now()).getTimezoneOffset() * 60000
        ).toLocaleTimeString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      )
      heading = heading.concat(servicesHeading)
      memberKeys = [...memberKeys.splice(0, memberKeys.length - 1), ...services]
    }
    return members.length === 0 || locals.length === 0 ? (
      <Loading />
    ) : (
      <table className="blueTable">
        <thead>
          <tr>{memberKeys.map((k, i) => <th key={k}>{heading[i]}</th>)}</tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.areaGroup}</td>
              <td>{m.lastName}</td>
              <td>{m.firstName}</td>
              <td>{CFO[m.cfo]}</td>
              <td>{m.officer}</td>
              <td>{m.gender}</td>
              <td>{locals.find(l => l.id === m.localId).name}</td>
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
  locals: state.local.locals
})

export default connect(mapState)(AdHocReportPane)
