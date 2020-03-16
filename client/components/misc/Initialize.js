import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  importFromSessionThunk,
  getAccessFromSessionThunk,
  getAllLocalsThunk,
  loadCompleteThunk
} from '../../store'
import Loading from './Loading'

class Initialize extends Component {
  componentDidMount = async () => {
    await this.props.fetchMembersFromSession()
    await this.props.fetchAccessFromSession()
    await this.props.fetchLocalsFromDatabase()
    setTimeout(() => {
      this.props.signalLoadComplete()
    }, 100)
  }

  render = () => <Loading />
}

const mapDispatch = dispatch => ({
  fetchMembersFromSession: () => dispatch(importFromSessionThunk()),
  fetchAccessFromSession: () => dispatch(getAccessFromSessionThunk()),
  fetchLocalsFromDatabase: () => dispatch(getAllLocalsThunk()),
  signalLoadComplete: () => dispatch(loadCompleteThunk())
})

export default connect(null, mapDispatch)(Initialize)
