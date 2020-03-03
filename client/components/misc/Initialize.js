import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  importFromSessionThunk,
  getAccessFromSessionThunk,
  getAllLocalsThunk
} from '../../store'
import {Line} from 'britecharts-react'

class Initialize extends Component {
  componentDidMount = async () => {
    await this.props.fetchMembersFromSession()
    await this.props.fetchAccessFromSession()
    await this.props.fetchLocalsFromDatabase()
  }

  render() {
    return <Line data={null} shouldShowLoadingState={true} />
  }
}

const mapDispatch = dispatch => ({
  fetchMembersFromSession: () => dispatch(importFromSessionThunk()),
  fetchAccessFromSession: () => dispatch(getAccessFromSessionThunk()),
  fetchLocalsFromDatabase: () => dispatch(getAllLocalsThunk())
})

export default connect(null, mapDispatch)(Initialize)
