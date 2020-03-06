import React, {Component} from 'react'
import {Tab} from 'react-bootstrap'
import Loading from '../misc/Loading'
import AdHocReportPane from './AdHocReportPane'
import {importFromSampleThunk, importFromSessionThunk} from '../../store'
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
      services: []
    }
  }

  componentDidMount = async () => {
    this.setState({
      isLoading: false
    })
  }

  render() {
    let {isLoading} = this.state
    const {rpId} = this.props.match.params
    const {members} = this.props
    let tabs = ListAreaGroups(isLoading)
    tabs.push('ALL')
    return members.length === 0 ? (
      <Loading />
    ) : (
      <Tab.Container defaultActiveKey={tabs[0]}>
        <TabNav tabs={tabs} />
        <Tab.Content>
          {tabs.map(t => {
            const areaGroup = t.split(' ')[1]
            const localId = t.split(' ')[0] === 'MAN' ? 'MANNY' : 'BBMANNY'
            return (
              <Tab.Pane key={t} eventKey={t} title={t}>
                <AdHocReportPane
                  areaGroup={areaGroup}
                  localId={localId}
                  reportingId={rpId}
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

const mapDispatch = dispatch => ({
  // fetchMembersFromSample: () => dispatch(importFromSampleThunk()),
  // fetchMembersFromSession: () => dispatch(importFromSessionThunk())
})

export default connect(mapState, mapDispatch)(AdHocReport)
