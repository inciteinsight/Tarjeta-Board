import React, {Component} from 'react'
import {connect} from 'react-redux'

class ReportingPane extends Component {
  render() {
    return (
      <table>
        <thead />
        <tbody />
      </table>
    )
  }
}

const mapState = state => ({
  members: state.attendance.members
})

export default connect(mapState)(ReportingPane)
