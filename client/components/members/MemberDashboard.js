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
      selectedMember: {
        id: '1914',
        areaGroup: '',
        lastName: '',
        firstName: '',
        cfo: 'B',
        officer: 'N',
        gender: 'M',
        isActive: true,
        localId: 'MANNYUS'
      },
      mode: '',
      latestIndexByGender: this.defaultGenderObject
    }
  }

  defaultGenderObject = {
    M: '',
    F: ''
  }

  componentDidMount = async () => {
    const {data} = await axios.get('/api/member/')
    await this.setState({
      members: data,
      isModalActive: false,
      selectedMember: {},
      mode: ''
    })
    const latestIndexByGender = this.findLatestIndexByGender(data)
    this.setState({latestIndexByGender})
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

  toggleMemberModal = async (member, mode) => {
    await this.setState({
      selectedMember: member,
      mode
    })
    this.setState({
      isModalActive: true
    })
  }

  confirmClose = () =>
    this.setState({
      isModalActive: false,
      mode: '',
      selectedMember: {
        id: '1914',
        areaGroup: '',
        lastName: '',
        firstName: '',
        cfo: 'B',
        officer: 'N',
        gender: 'M',
        isActive: true,
        localId: 'MANNYUS'
      }
    })

  renderIsActive = member => (
    <td className={`${member.isActive ? 'table-success' : 'table-danger'}`}>
      {member.isActive ? 'YES' : 'NO'}
    </td>
  )

  // latest male or female finder
  findLatestIndexByGender = members =>
    members.reduce((a, m) => {
      const gender = m.gender
      const memberGenId = m.id.slice(1)
      a[gender] = a[gender] < memberGenId ? memberGenId : a[gender]
      return a
    }, this.defaultGenderObject)

  render() {
    const {locals} = this.props
    const {
      members,
      mode,
      isModalActive,
      selectedMember,
      latestIndexByGender
    } = this.state
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
            <tr>
              <td colSpan="12">
                <Button
                  onClick={() =>
                    this.toggleMemberModal(
                      {
                        id: '1914',
                        areaGroup: '',
                        lastName: '',
                        firstName: '',
                        cfo: 'B',
                        officer: 'N',
                        gender: 'M',
                        isActive: true,
                        localId: 'MANNYUS'
                      },
                      'create'
                    )
                  }
                >
                  Create New Member
                </Button>
              </td>
            </tr>
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
                    className="w-100"
                    onClick={() => this.toggleMemberModal(m, 'update')}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalActive ? (
          <MemberModal
            show={isModalActive}
            onHide={this.confirmClose}
            mode={mode}
            member={selectedMember}
            locals={this.localsWithAreaGroups()}
            latestIndexByGender={latestIndexByGender}
          />
        ) : (
          <div />
        )}
      </Fragment>
    )
  }
}

const mapState = state => ({
  locals: state.local.locals
})

export default connect(mapState)(AdHocReportPane)
