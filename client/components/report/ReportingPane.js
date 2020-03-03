import React, {Component} from 'react'
import {connect} from 'react-redux'

class ReportingPane extends Component {
  render() {
    const {members} = this.props
    const memberKeys = Object.keys(members[0]).filter(
      k => k !== 'createdAt' && k !== 'updatedAt' && k !== 'isActive'
    )
    const heading = [
      'Id',
      'Area-Group',
      'Last Name',
      'First Name',
      'CFO',
      'Officer',
      'Gender',
      'Local',
      'Attended'
    ]
    return (
      <table className="blueTable">
        <thead>
          <tr>{memberKeys.map((k, i) => <th key={k}>{heading[i]}</th>)}</tr>
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
