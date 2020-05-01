import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretDown} from '@fortawesome/free-solid-svg-icons'
import {CFO} from '../../utils/board'
import TableizeData from './util/TableizeData'

class AdHocReportPane extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showDetails: false,
      table: {}
    }
  }

  componentDidMount = async () => {
    console.log('Calling cdm')
    const {attendance, locals, services, tab} = this.props

    // Tableize every tab, but only Excel printout the 'ALL' tab
    if (tab === 'ALL') {
      console.log('========== Attendance ==========')
      console.info(attendance)
      console.log('============ Locals ============')
      console.info(locals)
      console.log('=========== Services ===========')
      console.info(services)

      // run Excel print here
      const tablizer = await new TableizeData({attendance, locals, services})
      const {table} = tablizer
      this.setState({table})
    }
  }

  isCurrentService = () => this.props.selectionId === 'current'

  renderCurrentServiceAttendance = member => {
    const service = member.services[0]

    return (
      <td
        className={`${!service.hasAttended ? 'table-danger' : 'table-success'}`}
      >
        {service.hasAttended ? 'YES' : 'NO'}
      </td>
    )
  }

  renderPastAttendances = member => {
    const {services, handleSelectAttendance} = this.props
    return (
      <Fragment>
        {services.map(s => {
          const memberAttendance = member.services.find(
            a => a.worshipserviceId === s.id
          )
          return (
            <td
              onClick={() => handleSelectAttendance(memberAttendance.id, s)}
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

  // rework to utilize tablizer
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
              <th
                className="detail-head"
                onClick={() => this.setState({showDetails: false})}
              >
                <FontAwesomeIcon icon={faCaretDown} /> Local
              </th>
              <th
                className="detail-head"
                onClick={() => this.setState({showDetails: false})}
              >
                Area-Group
              </th>
              <th
                className="detail-head"
                onClick={() => this.setState({showDetails: false})}
              >
                CFO
              </th>
              <th
                className="detail-head"
                onClick={() => this.setState({showDetails: false})}
              >
                Officer
              </th>
              <th
                className="detail-head"
                onClick={() => this.setState({showDetails: false})}
              >
                Gender
              </th>
            </Fragment>
          ) : (
            <th
              className="detail-head"
              onClick={() => this.setState({showDetails: true})}
            >
              <FontAwesomeIcon icon={faCaretDown} /> Details
            </th>
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

  // push printable to redux
  // Excel Export up top

  render() {
    const {showDetails} = this.state
    const {attendance, locals, services, tab} = this.props
    const attendanceKeys = Object.keys(attendance)

    // if(tab === 'ALL') {
    //   console.log(attendance)
    //   console.log("Tableize Called")
    //   // we only want one Excel call, otherwise this will get expensive quickly
    // }

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
                <td style={{display: showDetails ? '' : 'none'}}>
                  {locals
                    .filter(l => member.localId.includes(l.id))
                    .map(l => l.name)
                    .join(', ')}
                </td>
                <td style={{display: showDetails ? '' : 'none'}}>
                  {member.areaGroup.join(', ')}
                </td>
                <td style={{display: showDetails ? '' : 'none'}}>
                  {member.cfo.map(cfo => CFO[cfo]).join(', ')}
                </td>
                <td style={{display: showDetails ? '' : 'none'}}>
                  {member.officer.join(', ')}
                </td>
                <td style={{display: showDetails ? '' : 'none'}}>
                  {member.gender.join(', ')}
                </td>
                <td
                  className="table-secondary"
                  style={{
                    display: showDetails ? 'none' : ''
                  }}
                />

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
