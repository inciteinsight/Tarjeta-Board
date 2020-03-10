import React, {Component} from 'react'
import {Modal, Button, Container, Form} from 'react-bootstrap'
import {CFO} from '../../utils/board'

// Unused for now

export default class MemberModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
  }

  componentDidMount = () => {
    if (this.props.mode === 'update') {
      const {
        id,
        areaGroup,
        lastName,
        firstName,
        cfo,
        officer,
        gender,
        isActive,
        localId
      } = this.props.member
      this.setState({
        id,
        areaGroup,
        lastName,
        firstName,
        cfo,
        officer,
        gender,
        isActive,
        localId
      })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  localDropdown = () => {
    const {locals, member} = this.props
    const localKeys = Object.keys(locals)
    return (
      <select
        className="form-control"
        required
        name="localId"
        onChange={this.handleChange}
      >
        {localKeys.map(k => {
          const selectedLocal = locals[k]
          return (
            <option key={k} selected={k === member.localId} value={k}>
              {selectedLocal.name}
            </option>
          )
        })}
      </select>
    )
  }

  areaGroupsDropdown = () => {
    const {localId} = this.state
    const {member} = this.props
    return (
      <select
        className="form-control"
        required
        name="areaGroup"
        onChange={this.handleChange}
      >
        {this.props.locals[localId].areaGroups.map(ag => (
          <option key={ag} selected={ag === member.areaGroup} value={ag}>
            {ag}
          </option>
        ))}
      </select>
    )
  }

  cfoDropdown = () => {
    const {member} = this.props
    const cfoKeys = Object.keys(CFO)
    return (
      <select
        className="form-control"
        required
        name="cfo"
        onChange={this.handleChange}
      >
        {cfoKeys.map(cfo => (
          <option key={cfo} selected={cfo === member.cfo} value={cfo}>
            {CFO[cfo]}
          </option>
        ))}
      </select>
    )
  }

  genericDropdown = (property, options) => {
    const {member} = this.props
    return (
      <select
        className="form-control"
        required
        name={property}
        onChange={this.handleChange}
      >
        {options.map(o => (
          <option key={o} selected={o === member[property]} value={o}>
            {String(o)}
          </option>
        ))}
      </select>
    )
  }

  render() {
    const {id, lastName, firstName, cfo, officer, gender, isActive} = this.state
    return (
      <tr>
        <td className="row form-group form-check form-check-inline w-100">
          <input
            value={id}
            type="text"
            className="form-control"
            id="id"
            name="id"
            onChange={this.handleChange}
            required
            disabled
          />
        </td>
        <td className="row form-group form-check form-check-inline w-100">
          {this.localDropdown()}
        </td>
        <td className="row form-group form-check form-check-inline w-100">
          {this.areaGroupsDropdown()}
        </td>
        <td className="row form-group form-check form-check-inline w-100">
          <input
            value={firstName}
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            onChange={this.handleChange}
            required
          />
        </td>
        <td className="row form-group form-check form-check-inline w-100">
          <input
            value={lastName}
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            onChange={this.handleChange}
            required
          />
        </td>
        <td className="row form-group form-check form-check-inline w-100">
          {this.cfoDropdown()}
        </td>
        <td className="row form-group form-check form-check-inline w-100">
          {this.genericDropdown('officer', ['Y', 'N'])}
        </td>
        <td className="row form-group form-check form-check-inline w-100">
          {this.genericDropdown('gender', ['M', 'F'])}
        </td>
        <td className="row form-group form-check form-check-inline w-100">
          {this.genericDropdown('isActive', [true, false])}
        </td>
      </tr>
    )
  }
}
