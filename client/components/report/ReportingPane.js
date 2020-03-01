import React, {Component} from 'react'
import {connect} from 'react-redux'

class ReportingPane extends Component {
  render() {
    const {members} = this.props
    const memberProps = Object.keys(members[0])
    return (
      <table className="blueTable">
        <thead>
          <tr>{memberProps.map(k => <th key={k}>{k}</th>)}</tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.Id}>
              {memberProps.map(k => (
                <td key={`${k} - ${m.Id}`}>{String(m[k])}</td>
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
