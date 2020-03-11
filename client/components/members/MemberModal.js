import React, {Component} from 'react'
import {Modal, Button, Container, Form} from 'react-bootstrap'
import {CFO} from '../../utils/board'
import Loading from '../misc/Loading'
import axios from 'axios'
import alertify from 'alertifyjs'

export default class MemberModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
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

  componentDidMount = async () => {
    await this.reset()
    this.handleIdByGender()
  }

  handleIdByGender = () => {
    const {latestIndexByGender, mode} = this.props
    if (mode === 'create') {
      const {gender} = this.state
      this.setState({id: `${gender}${Number(latestIndexByGender[gender]) + 1}`})
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSave = async e => {
    e.preventDefault()
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
    } = this.state
    const {mode, onHide} = this.props

    const dataToSend = {
      id,
      areaGroup,
      lastName,
      firstName,
      cfo,
      officer,
      gender,
      isActive,
      localId
    }

    let res
    if (mode === 'update') {
      res = await axios.put('/api/member', dataToSend)
    } else if (mode === 'create') {
      res = await axios.post('/api/member', dataToSend)
    }

    const {data, status} = res
    if (status === 409) {
      history.push('/control/members')
      alertify.error(`Error. Id exists as ${data.firstName} ${data.lastName}`)
    } else {
      onHide()
      alertify.success(`${mode.toUpperCase()} SUCCESS`)
    }
  }

  localDropdown = () => {
    const {locals, member} = this.props
    const localKeys = Object.keys(locals)
    return (
      <select
        className="col-8 form-control"
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
        className="col-8 form-control"
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
        className="col-8 form-control"
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

  genderDropdown = () => {
    const {member} = this.props
    return (
      <select
        className="col-8 form-control"
        required
        name="gender"
        onChange={async e => {
          await this.handleChange(e)
          this.handleIdByGender()
        }}
      >
        <option key="M" selected={member.gender === 'M'} value="M">
          Male
        </option>
        <option key="F" selected={member.gender === 'F'} value="F">
          Female
        </option>
      </select>
    )
  }

  genericDropdown = (property, options) => {
    const {member} = this.props
    return (
      <select
        className="col-8 form-control"
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

  reset = async () => {
    await this.setState({isLoading: true})
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
    if (this.props.mode === 'update') {
      await this.setState({
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
    this.setState({isLoading: false})
  }

  render() {
    const {isLoading, id, lastName, firstName} = this.state
    const {onHide, mode} = this.props
    if (isLoading) return <Loading />
    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{`${mode.toUpperCase()} MEMBER`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container
            as={Form}
            className="d-flex flex-column align-items-center"
            onSubmit={this.handleSubmit}
          >
            <div className="row form-group form-check form-check-inline w-100">
              <label className="col-4 font-weight-bold text-right" htmlFor="id">
                Member ID
              </label>
              <input
                value={id}
                type="text"
                className="form-control col-8"
                id="id"
                name="id"
                onChange={this.handleChange}
                required
                disabled={!(mode === 'create')}
              />
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="areaGroup"
              >
                Local
              </label>
              {this.localDropdown()}
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="areaGroup"
              >
                Area Group
              </label>
              {this.areaGroupsDropdown()}
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label className="col-4 font-weight-bold text-right" htmlFor="id">
                First Name
              </label>
              <input
                value={firstName}
                type="text"
                className="form-control col-8"
                id="firstName"
                name="firstName"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label className="col-4 font-weight-bold text-right" htmlFor="id">
                Last Name
              </label>
              <input
                value={lastName}
                type="text"
                className="form-control col-8"
                id="lastName"
                name="lastName"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="cfo"
              >
                CFO
              </label>
              {this.cfoDropdown()}
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="officer"
              >
                Officer
              </label>
              {this.genericDropdown('officer', ['Y', 'N'])}
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="gender"
              >
                Gender
              </label>
              {this.genderDropdown()}
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="isActive"
              >
                Registered in Local
              </label>
              {this.genericDropdown('isActive', [true, false])}
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={this.handleSave}>
            Save
          </Button>
          <Button variant="warning" onClick={this.reset}>
            Reset
          </Button>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
