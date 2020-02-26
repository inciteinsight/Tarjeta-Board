import React, {Component} from 'react'
import {connect} from 'react-redux'

class ReportingPane extends Component {
  render() {
    const {members} = this.props
    console.log(members)
    return (
      <table>
        <thead>
          <tr>{Object.keys(members[0]).map(k => <th key={k}>{k}</th>)}</tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.Id}>
              {Object.keys(members[0]).map(k => (
                <td key={`${k} - ${m.Id}`}>{m[k]}</td>
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
