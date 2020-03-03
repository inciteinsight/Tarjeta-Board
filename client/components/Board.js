import React, {Component} from 'react'
import {connect} from 'react-redux'
import {importFromSampleThunk, importFromSessionThunk} from '../store'
import AreaGroupPane from './attendance/AreaGroupPane'
import Loading from './misc/Loading'
import {Tab} from 'react-bootstrap'
import TabNav from './nav/TabNav'

export class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  componentDidMount = async () => {
    await this.props.fetchMembersFromSession()
    // await this.props.fetchMembersFromSample()
    this.setState({
      isLoading: false
    })
  }

  listAreaGroups = (loading, config) => {
    if (loading) {
      return []
    }
    const {Manhattan, BBExt} = config.local
    return Manhattan.areaGroup
      .map(ag => `MAN ${ag}`)
      .concat(BBExt.areaGroup.map(ag => `BB ${ag}`))
  }

  render() {
    let {isLoading} = this.state
    const {gender} = this.props.match.params
    const tabs = this.listAreaGroups(isLoading, this.props.config)
    return isLoading ? (
      <Loading />
    ) : (
      <Tab.Container defaultActiveKey={tabs[0]}>
        <Tab.Content>
          <TabNav tabs={tabs} />
          {tabs.map(t => {
            const areaGroup = t.split(' ')[1]
            const local = t.split(' ')[0] === 'MAN' ? 'MANNY' : 'BBMANNY'
            return (
              <Tab.Pane key={t} eventKey={t} title={t}>
                <AreaGroupPane
                  areaGroup={areaGroup}
                  local={local}
                  members={this.props.members.filter(
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
  config: state.attendance.config
})

const mapDispatch = dispatch => ({
  fetchMembersFromSample: () => dispatch(importFromSampleThunk()),
  fetchMembersFromSession: () => dispatch(importFromSessionThunk())
})

export default connect(mapState, mapDispatch)(Board)
