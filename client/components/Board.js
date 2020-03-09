import React, {Component} from 'react'
import {connect} from 'react-redux'
import AreaGroupPane from './attendance/AreaGroupPane'
import Loading from './misc/Loading'
import {Tab, Button} from 'react-bootstrap'
import TabNav from './nav/TabNav'
// import {ListAreaGroups} from '../utils/board'

export class Board extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     isLoading: true
  //   }
  // }

  // componentDidMount = () => {
  //   this.setState({
  //     isLoading: false
  //   })
  // }

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
    const {members, reportingPeriod} = this.props
    const tabs = this.tabulizeAreaGroupMembers()
    const tabNames = Object.keys(tabs)

    if (members.length === 0 || !reportingPeriod) {
      return <Loading />
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
  email: state.user.email,
  members: state.attendance.members,
  reportingPeriod: state.attendance.reportingPeriod
})

export default connect(mapState)(Board)
