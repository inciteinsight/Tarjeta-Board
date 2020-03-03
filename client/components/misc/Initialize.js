import React, {Component} from 'react'
import {connect} from 'react-redux'
import {importFromSessionThunk, getAccessFromSessionThunk} from '../../store'
import {Line} from 'britecharts-react'

class Initialize extends Component {
  componentDidMount = async () => {
    await this.props.fetchMembersFromSession()
    await this.props.fetchAccessFromSession()
  }

  render() {
    return <Line data={null} shouldShowLoadingState={true} />
  }
}

const mapDispatch = dispatch => ({
  fetchMembersFromSession: () => dispatch(importFromSessionThunk()),
  fetchAccessFromSession: () => dispatch(getAccessFromSessionThunk())
})

export default connect(null, mapDispatch)(Initialize)
