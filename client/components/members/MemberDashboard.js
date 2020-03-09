import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Loading from '../misc/Loading'
import {CFO} from '../../utils/board'
import {Button} from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'

class AdHocReportPane extends Component {
  constructor(props) {
    super(props)

    this.state = {
      members: []
    }
  }

  componentDidMount = async () => {
    const {data} = await axios.get('/api/member/')
    this.setState({members: data})
  }

  renderIsActive = member => (
    <td className={`${member.isActive ? 'table-success' : 'table-danger'}`}>
      {member.isActive ? 'YES' : 'NO'}
    </td>
  )

  render() {
    const {locals} = this.props
    const {members} = this.state
    const heading = [
      'Id',
      'Local',
      'Area-Group',
      'Last Name',
      'First Name',
      'CFO',
      'Officer',
      'Gender',
      'Registered',
      'Created',
      'Updated',
      'Edit Mode'
    ]

    return members.length === 0 || locals.length === 0 ? (
      <Loading />
    ) : (
      <table className="blueTable">
        <thead>
          <tr>{heading.map((k, i) => <th key={k}>{heading[i]}</th>)}</tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{locals.find(l => l.id === m.localId).name}</td>
              <td>{m.areaGroup}</td>
              <td>{m.lastName}</td>
              <td>{m.firstName}</td>
              <td>{CFO[m.cfo]}</td>
              <td>{m.officer}</td>
              <td>{m.gender}</td>
              {this.renderIsActive(m)}
              <td>{moment(m.createdAt).format('LLLL')}</td>
              <td>{moment(m.updatedAt).format('LLLL')}</td>
              <td>
                <Button>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

const mapState = state => ({
  locals: state.local.locals
})

export default connect(mapState)(AdHocReportPane)
