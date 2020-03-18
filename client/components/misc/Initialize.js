import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  importFromSessionThunk,
  getAccessFromSessionThunk,
  getAccessibleLocalsThunk,
  loadCompleteThunk
} from '../../store'
import Loading from './Loading'

class Initialize extends Component {
  componentDidMount = async () => {
    const {id} = this.props
    await this.props.fetchMembersFromSession()
    await this.props.fetchAccessFromSession()
    await this.props.fetchLocalsFromDatabase(id)
    setTimeout(() => {
      this.props.signalLoadComplete()
    }, 100)
  }

  render = () => <Loading />
}

const mapState = state => ({
  id: state.user.id
})

const mapDispatch = dispatch => ({
  fetchMembersFromSession: () => dispatch(importFromSessionThunk()),
  fetchAccessFromSession: () => dispatch(getAccessFromSessionThunk()),
  fetchLocalsFromDatabase: userId => dispatch(getAccessibleLocalsThunk(userId)),
  signalLoadComplete: () => dispatch(loadCompleteThunk())
})

export default connect(mapState, mapDispatch)(Initialize)
