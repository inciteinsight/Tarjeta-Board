import React, {Component} from 'react'
import {Tab} from 'react-bootstrap'
import Loading from '../misc/Loading'
import AdHocReportPane from './AdHocReportPane'
import {connect} from 'react-redux'
import TabNav from '../nav/TabNav'
import {ListAreaGroups} from '../../utils/board'
import axios from 'axios'

class AdHocReport extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      attendance: [],
      services: [],
      isNotified: false
    }
  }

  confirmClose = () => this.setState({isNotified: false})

  componentDidMount = () => {}

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

    this.setState({
      isLoading: false
    })
  }

  render() {
    let {isLoading, attendance, services} = this.state
    const {reportingId} = this.props.match.params
    const {members} = this.props
    let tabs = ListAreaGroups(isLoading)
    console.log(tabs)
    tabs.push('ALL')
    return members.length === 0 ? (
      <Loading />
    ) : (
      <Tab.Container defaultActiveKey={tabs[0]}>
        <TabNav tabs={tabs} />
        <Tab.Content>
          {tabs.map(t => {
            const areaGroup = t.split(' ')[1]
            const localId = t.split(' ')[0] === 'MAN' ? 'MANNYUS' : 'BBxNYUS'
            return (
              <Tab.Pane key={t} eventKey={t} title={t}>
                <AdHocReportPane
                  areaGroup={areaGroup}
                  localId={localId}
                  reportingId={reportingId}
                  attendance={attendance}
                  services={services}
                  members={members.filter(
                    m =>
                      (m.areaGroup === areaGroup && m.localId === localId) ||
                      t === 'ALL'
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
  members: state.attendance.members
})

export default connect(mapState)(AdHocReport)
