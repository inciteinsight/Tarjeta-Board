import React, {Component} from 'react'
import {Tab} from 'react-bootstrap'
import AdHocReportPane from './AdHocReportPane'
import {connect} from 'react-redux'
import TabNav from '../nav/TabNav'
import axios from 'axios'

class AdHocReport extends Component {
  constructor(props) {
    super(props)

    this.state = {
      attendance: {},
      services: [],
      districtRegion: 'NYUS' /* For district functionality */
    }
  }

  componentDidMount = async () => {
    const {reportingId} = this.props.match.params
    if (reportingId !== 'current') {
      const {data} = await axios.get(`/api/ws/reporting/${reportingId}/ext`)
      await this.setState({
        attendance: this.consolidateAttendanceToMembers(data),
        services: data
      })
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const {reportingId} = this.props.match.params
    const {members} = this.props
    if (
      reportingId === 'current' &&
      Object.keys(prevState.attendance).length === 0 &&
      members.length > 0
    ) {
      this.loadCurrentData()
    }
  }

  consolidateAttendanceToMembers = attendance => {
    const attendanceFromAllServices = attendance.reduce((accum, s) => {
      accum = accum.concat(s.attendances)
      return accum
    }, [])

    const consolidatedAttendance = attendanceFromAllServices.reduce(
      (accum, a, i) => {
        const {
          id,
          hasAttended,
          localId,
          areaGroup,
          lastName,
          firstName,
          cfo,
          officer,
          gender,
          code,
          notes,
          memberId,
          worshipserviceId
        } = a
        if (!accum[memberId]) {
          accum[memberId] = {
            memberId: memberId,
            lastName: [lastName],
            firstName: [firstName],
            localId: [localId],
            areaGroup: [areaGroup],
            lag: [`${localId}%${areaGroup}`],
            cfo: [cfo],
            officer: [officer],
            gender: [gender],
            services: [
              {
                id,
                worshipserviceId,
                hasAttended,
                code,
                notes
              }
            ]
          }
        } else {
          const attendanceKeys = Object.keys(accum[memberId])
          attendanceKeys.shift() // remove memberId
          attendanceKeys.pop() // remove services
          attendanceKeys.forEach(ak => {
            if (ak === 'lag') {
              if (
                accum[memberId].lag.indexOf(`${localId}%${areaGroup}`) === -1
              ) {
                accum[memberId].lag.push(`${localId}%${areaGroup}`)
              }
            } else if (accum[memberId][ak].indexOf(a[ak]) === -1) {
              accum[memberId][ak].push(a[ak])
            }
          })
          accum[memberId].services.push({
            id,
            worshipserviceId,
            hasAttended,
            code,
            notes
          })
        }
        return accum
      },
      {}
    )
    return consolidatedAttendance
  }

  tabulizeAreaGroupMembers = () => {
    const {members} = this.props
    return members.reduce((a, m) => {
      m.lag.forEach(lag => {
        const [localId, areaGroup] = lag.split('%')
        const tabName = `${localId.slice(0, 3)} ${areaGroup}`
        if (!a[tabName]) a[tabName] = [m]
        else a[tabName].push(m)
        return a
      })
    }, {})
  }

  loadCurrentData = async () => {
    const {members, worshipService} = this.props.attendance
    const formattedMembers = await members.map((m, i) => {
      let newMember = JSON.parse(JSON.stringify(m))
      newMember.memberId = m.id
      newMember.id = `TEMP${i}`
      newMember.worshipserviceId = worshipService.id
      return newMember
    })
    worshipService.attendances = formattedMembers
    console.info(worshipService)
    this.setState({
      attendance: this.consolidateAttendanceToMembers([worshipService]),
      services: [worshipService]
    })
  }

  tabulizeAreaGroupAttendance = () => {
    const {attendance} = this.state
    const attendanceKeys = Object.keys(attendance)
    return attendanceKeys.reduce((a, k) => {
      const currentMemberAttendance = attendance[k]
      currentMemberAttendance.lag.forEach(lag => {
        const [localId, areaGroup] = lag.split('%')
        const tabName = `${localId.slice(0, 3)} ${areaGroup}`
        if (!a[tabName]) a[tabName] = [currentMemberAttendance]
        else a[tabName].push(currentMemberAttendance)
      })
      return a
    }, {})
  }

  render() {
    let {attendance, services, districtRegion} = this.state
    const {reportingId} = this.props.match.params
    const {appInitialized} = this.props

    if (!appInitialized || attendance.length === 0) {
      return <div />
    }

    let tabs = this.tabulizeAreaGroupAttendance()
    const tabNames = Object.keys(tabs)
    tabNames.unshift('ALL')
    return !appInitialized ? (
      <div />
    ) : (
      <Tab.Container defaultActiveKey={tabNames[0]}>
        <TabNav tabs={tabNames} />
        <Tab.Content>
          {tabNames.map(t => {
            const [localId, areaGroup] = t.split(' ')
            return (
              <Tab.Pane key={t} eventKey={t} title={t}>
                <AdHocReportPane
                  areaGroup={areaGroup}
                  localId={`${localId}${districtRegion}`}
                  reportingId={reportingId}
                  attendance={t === 'ALL' ? attendance : tabs[t]}
                  services={services}
                />
              </Tab.Pane>
            )
          })}
        </Tab.Content>
      </Tab.Container>
    )
  }
}

const mapState = state => ({
  appInitialized: state.loading.appInitialized,
  attendance: state.attendance,
  members: state.attendance.members
})

export default connect(mapState)(AdHocReport)
