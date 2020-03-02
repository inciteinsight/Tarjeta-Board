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
    const {Manhattan, BBExt} = config.Local
    return Manhattan.AreaGroup.map(ag => `MAN ${ag}`).concat(
      BBExt.AreaGroup.map(ag => `BB ${ag}`)
    )
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
            const Local =
              t.split(' ')[0] === 'MAN' ? 'Manhattan' : 'B. Beach Ext'
            return (
              <Tab.Pane key={t} eventKey={t} title={t}>
                <AreaGroupPane
                  areaGroup={areaGroup}
                  Local={Local}
                  members={this.props.members.filter(
                    m =>
                      m.AreaGroup === areaGroup &&
                      m.Local === Local &&
                      (gender ? m.Gender === gender : true)
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
