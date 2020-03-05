import React, {Component} from 'react'
import {connect} from 'react-redux'
import {importFromSampleThunk, importFromSessionThunk} from '../store'
import AreaGroupPane from './attendance/AreaGroupPane'
import Loading from './misc/Loading'
import {Tab} from 'react-bootstrap'
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
    const {members} = this.props
    const tabs = ListAreaGroups(isLoading)
    return members.length === 0 ? (
      <Loading />
    ) : (
      <Tab.Container defaultActiveKey="MAN 1-1">
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
  members: state.attendance.members
})

const mapDispatch = dispatch => ({
  fetchMembersFromSample: () => dispatch(importFromSampleThunk()),
  fetchMembersFromSession: () => dispatch(importFromSessionThunk())
})

export default connect(mapState, mapDispatch)(Board)
