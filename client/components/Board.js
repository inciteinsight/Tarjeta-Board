import React, {Component} from 'react'
import {connect} from 'react-redux'
import AreaGroupPane from './attendance/AreaGroupPane'
import Loading from './misc/Loading'
import {Tab, Button} from 'react-bootstrap'
import TabNav from './nav/TabNav'
import {ListAreaGroups} from '../utils/board'

export class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  componentDidMount = () => {
    this.setState({
      isLoading: false
    })
  }

  render() {
    let {isLoading} = this.state
    const {gender} = this.props.match.params
    const {members, reportingPeriod} = this.props
    const tabs = ListAreaGroups(isLoading)

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
      <Tab.Container defaultActiveKey="MAN 1-1">
        <Tab.Content>
          <TabNav tabs={tabs} />
          {tabs.map(t => {
            const areaGroup = t.split(' ')[1]
            const local = t.split(' ')[0] === 'MAN' ? 'MANNYUS' : 'BBxNYUS'
            return (
              <Tab.Pane key={t} eventKey={t} title={t}>
                <AreaGroupPane
                  areaGroup={areaGroup}
                  local={local}
                  members={members.filter(
                    m =>
                      m.areaGroup === areaGroup &&
                      m.localId === local &&
                      (gender ? m.gender === gender : true)
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
