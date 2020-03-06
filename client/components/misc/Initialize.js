import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  importFromSessionThunk,
  getAccessFromSessionThunk,
  getAllLocalsThunk
} from '../../store'
import {Line} from 'britecharts-react'
import history from '../../history'

class Initialize extends Component {
  componentDidMount = async () => {
    await this.props.fetchMembersFromSession()
    await this.props.fetchAccessFromSession()
    await this.props.fetchLocalsFromDatabase()
    if (this.props.reportingId === 0) {
      history.push('/service/new')
    }
  }

  render() {
    return <Line data={null} shouldShowLoadingState={true} />
  }
}

const mapState = state => ({
  reportingId: state.attendance.reportingPeriod.id
})

const mapDispatch = dispatch => ({
  fetchMembersFromSession: () => dispatch(importFromSessionThunk()),
  fetchAccessFromSession: () => dispatch(getAccessFromSessionThunk()),
  fetchLocalsFromDatabase: () => dispatch(getAllLocalsThunk())
})

export default connect(mapState, mapDispatch)(Initialize)
