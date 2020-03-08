import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Loading from '../misc/Loading'
import {CFO} from '../../utils/board'
import moment from 'moment'

class AdHocReportPane extends Component {
  isCurrentService = () => this.props.reportingId === 'current'

  renderCurrentServiceAttendance = member => (
    <td className={`${member.hasAttended ? 'table-success' : 'table-danger'}`}>
      {member.hasAttended ? 'YES' : 'NO'}
    </td>
  )

  renderPastAttendances = member => {
    const {services} = this.props
    return (
      <Fragment>
        {services.map(s => {
          const hasAttendedService = s.attendances.find(
            a => a.memberId === member.id
          ).hasAttended
          return (
            <td
              key={s.dateTime}
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
    const dateTimeArray = services.map(s => s.dateTime)
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
      const servicesHeading = dateTimeArray.map(dateTime =>
        new Date(
          new Date(dateTime).getTime() +
            new Date(Date.now()).getTimezoneOffset() * 60000 +
            (moment().isDST() ? 1000 * 60 * 60 : 0)
        ).toLocaleTimeString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      )
      heading = heading.concat(servicesHeading)
      memberKeys = [
        ...memberKeys.splice(0, memberKeys.length - 1),
        ...dateTimeArray
      ]
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
