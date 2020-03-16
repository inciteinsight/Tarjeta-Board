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
      attendance: [],
      services: [],
      districtRegion: 'NYUS' /* For district functionality */
    }
  }

  componentDidMount = async () => {
    const {reportingId} = this.props.match.params
    if (reportingId !== 'current') {
      const {data} = await axios.get(
        `/api/ws/reporting/${reportingId}/includeExt`
      )
      this.setState({
        attendance: data.reduce((a, s) => {
          a = a.concat(s.attendances)
          return a
        }, []),
        services: data
      })
    }
  }

  tabulizeAreaGroupMembers = () => {
    const {members} = this.props
    return members.reduce((a, m) => {
      const tabName = `${m.localId.slice(0, 3)} ${m.areaGroup}`
      if (!a[tabName]) a[tabName] = [m]
      else a[tabName].push(m)
      return a
    }, {})
  }

  render() {
    let {attendance, services, districtRegion} = this.state
    const {reportingId} = this.props.match.params
    const {members, appInitialized} = this.props
    let tabs = this.tabulizeAreaGroupMembers()
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
                  attendance={attendance}
                  services={services}
                  members={t === 'ALL' ? members : tabs[t]}
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
  members: state.attendance.members
})

export default connect(mapState)(AdHocReport)
