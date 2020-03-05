import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loading from '../misc/Loading'
import {CFO} from '../../utils/board'

class ReportingPane extends Component {
  render() {
    const {members, locals} = this.props
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
    return members.length === 0 || locals.length === 0 ? (
      <Loading />
    ) : (
      <table className="blueTable">
        <thead>
          <tr>{memberKeys.map((k, i) => <th key={k}>{heading[i]}</th>)}</tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.areaGroup}</td>
              <td>{m.lastName}</td>
              <td>{m.firstName}</td>
              <td>{CFO[m.cfo]}</td>
              <td>{m.officer}</td>
              <td>{m.gender}</td>
              <td>{locals.find(l => l.id === m.localId).name}</td>
              <td
                className={`${
                  m.hasAttended ? 'table-success' : 'table-danger'
                }`}
              >
                {m.hasAttended ? 'YES' : 'NO'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

const mapState = state => ({
  config: state.attendance.config,
  locals: state.local.locals
})

export default connect(mapState)(ReportingPane)
