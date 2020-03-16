import React, {Component} from 'react'
import {connect} from 'react-redux'
import AreaGroupPane from './attendance/AreaGroupPane'
import {Tab, Button} from 'react-bootstrap'
import TabNav from './nav/TabNav'
import axios from 'axios'

export class Board extends Component {
  componentDidMount = () => {
    this.setupBeforeUnloadListener()
  }

  setupBeforeUnloadListener = () => {
    window.addEventListener('beforeunload', e => {
      e.preventDefault()
      return this.saveSession()
    })
  }

  saveSession = async () => {
    const {members} = this.props
    await axios.put(`/api/cache/members`, members)
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
    const {gender} = this.props.match.params
    const {reportingPeriod, appInitialized} = this.props
    const tabs = this.tabulizeAreaGroupMembers()
    const tabNames = Object.keys(tabs)

    if (!appInitialized) {
      return <div />
    }

    if (reportingPeriod.id === 0) {
      return (
        <div className="tarjeta-placeholder d-flex flex-column justify-content-center align-items-center">
          <h1>Please create a new Worship Service Attendance instance</h1>
          <Button variant="secondary" size="lg" href="/service/new">
            New Worship Service Form
          </Button>
        </div>
      )
    }

    return (
      <Tab.Container defaultActiveKey={tabNames[0]}>
        <Tab.Content>
          <TabNav tabs={tabNames} />
          {tabNames.map(t => {
            const [local, areaGroup] = t.split(' ')
            return (
              <Tab.Pane key={t} eventKey={t} title={t}>
                <AreaGroupPane
                  areaGroup={areaGroup}
                  local={local}
                  members={tabs[t].filter(
                    m => (gender ? gender === m.gender : true)
                  )}
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
  email: state.user.email,
  members: state.attendance.members,
  reportingPeriod: state.attendance.reportingPeriod
})

export default connect(mapState)(Board)
