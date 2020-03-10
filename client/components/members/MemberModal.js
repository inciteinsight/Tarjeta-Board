import React, {Component} from 'react'
import {Modal, Button, Container, Form} from 'react-bootstrap'
import {CFO} from '../../utils/board'

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

  render() {
    const {id, lastName, firstName, cfo, officer, gender, isActive} = this.state
    const {onHide, mode} = this.props
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
                disabled
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
              {this.genericDropdown('gender', ['M', 'F'])}
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
          <Button variant="warning" onClick={this.handleTrigger}>
            Save
          </Button>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}