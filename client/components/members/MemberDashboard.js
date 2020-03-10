import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Loading from '../misc/Loading'
import {CFO} from '../../utils/board'
import {Button} from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'
import MemberModal from './MemberModal'

class AdHocReportPane extends Component {
  constructor(props) {
    super(props)

    this.state = {
      members: [],
      isModalActive: false,
      selectedMember: {},
      mode: ''
    }
  }

  componentDidMount = async () => {
    const {data} = await axios.get('/api/member/')
    // const {locals} = this.props

    // const localsWithAreaGroups = data.reduce((a,m) => {
    //   const {localId} = m
    //   if (!a[localId]) {
    //     a[localId] = {
    //       name: locals.find(l => l.id === localId).name,
    //       areaGroups: [m.areaGroup]
    //     }
    //   } else if(a[localId].areaGroups.indexOf(m.areaGroup) === -1) {
    //     a[localId].areaGroups.push(m.areaGroup)
    //   }
    //   return a
    // },{})

    // console.log(localsWithAreaGroups)

    this.setState({members: data})
  }

  localsWithAreaGroups = () => {
    const {members} = this.state
    const {locals} = this.props
    return members.reduce((a, m) => {
      const {localId} = m
      if (!a[localId]) {
        a[localId] = {
          name: locals.find(l => l.id === localId).name,
          areaGroups: [m.areaGroup]
        }
      } else if (a[localId].areaGroups.indexOf(m.areaGroup) === -1) {
        a[localId].areaGroups.push(m.areaGroup)
      }
      return a
    }, {})
  }

  confirmClose = () =>
    this.setState({isModalActive: false, mode: '', selectedMember: {}})

  renderIsActive = member => (
    <td className={`${member.isActive ? 'table-success' : 'table-danger'}`}>
      {member.isActive ? 'YES' : 'NO'}
    </td>
  )

  render() {
    const {locals} = this.props
    const {members, mode, isModalActive, selectedMember} = this.state
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
      <Fragment>
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
                  <Button
                    onClick={() =>
                      this.setState({
                        isModalActive: true,
                        selectedMember: m,
                        mode: 'update'
                      })
                    }
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <MemberModal
          show={isModalActive}
          onHide={this.confirmClose}
          mode={mode}
          member={selectedMember}
          locals={this.localsWithAreaGroups()}
        />
      </Fragment>
    )
  }
}

const mapState = state => ({
  locals: state.local.locals
})

export default connect(mapState)(AdHocReportPane)
