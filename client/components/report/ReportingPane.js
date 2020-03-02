import React, {Component} from 'react'
import {connect} from 'react-redux'

class ReportingPane extends Component {
  render() {
    const {members} = this.props
    const memberKeys = Object.keys(members[0]).slice(1)
    return (
      <table className="blueTable">
        <thead>
          <tr>{memberKeys.map(k => <th key={k}>{k}</th>)}</tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id}>
              {memberKeys.map(k => (
                <td key={`${k} - ${m.id}`}>{String(m[k])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

const mapState = state => ({
  config: state.attendance.config
})

export default connect(mapState)(ReportingPane)
