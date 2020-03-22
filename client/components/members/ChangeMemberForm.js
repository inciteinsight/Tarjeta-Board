import React, {Fragment} from 'react'
import {Modal, Button, Container, Form} from 'react-bootstrap'
import ConfirmWithPassword from '../misc/ConfirmWithPassword'
import {CFO} from '../../utils/board'
import axios from 'axios'
import alertify from 'alertifyjs'

// All the props
const ChangeMemberForm = props => {
  const {localId, locals, member, handleChange} = props

  const localDropdown = () => {
    // const {locals, member} = props
    const localKeys = Object.keys(locals)
    return (
      <select
        className="col-8 form-control"
        required
        name="localId"
        onChange={handleChange}
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

  const areaGroupsDropdown = () => {
    // const {localId} = this.state
    // const {member} = this.props
    return (
      <select
        className="col-8 form-control"
        required
        name="areaGroup"
        onChange={handleChange}
      >
        {locals[localId].areaGroups.map(ag => (
          <option key={ag} selected={ag === member.areaGroup} value={ag}>
            {ag}
          </option>
        ))}
      </select>
    )
  }

  const cfoDropdown = () => {
    // const {member} = this.props
    const cfoKeys = Object.keys(CFO)
    return (
      <select
        className="col-8 form-control"
        required
        name="cfo"
        onChange={handleChange}
      >
        {cfoKeys.map(cfo => (
          <option key={cfo} selected={cfo === member.cfo} value={cfo}>
            {CFO[cfo]}
          </option>
        ))}
      </select>
    )
  }

  const genderDropdown = () => {
    // const {member} = this.props
    return (
      <select
        className="col-8 form-control"
        required
        name="gender"

        // create new function in parent

        // onChange={async e => {
        //   await this.handleChange(e)
        //   this.handleIdByGender()
        // }}
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

  const genericDropdown = (property, options) => {
    // const {member} = this.props
    return (
      <select
        className="col-8 form-control"
        required
        name={property}
        onChange={handleChange}
      >
        {options.map(o => (
          <option key={o} selected={o === member[property]} value={o}>
            {String(o)}
          </option>
        ))}
      </select>
    )
  }

  const {id, lastName, firstName, mode, handleSubmit} = props

  // if (isLoading) return <div />

  // if (isDeleting) {
  //   return (
  //     <ConfirmWithPassword
  //       title="Deleting Member"
  //       message={`Are you sure you want to delete ${firstName} ${lastName}? All attendance records will be wiped out. This cannot be reversed.
  //       Alternatively, you can untrack a member changing the Local Registration dropdown - Past attendances will be preserved.`}
  //       secPass={true}
  //       show={isDeleting}
  //       onHide={this.confirmClose}
  //       buttonMessage="Confirm Delete"
  //       trigger={this.handleDelete}
  //     />
  //   )
  // }

  return (
    //   <Modal
    //     {...this.props}
    //     aria-labelledby="contained-modal-title-vcenter"
    //     centered
    //   >
    /* {<Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{`${mode.toUpperCase()} MEMBER`}</Modal.Title>
        </Modal.Header>
        <Modal.Body> }*/
    <Container
      as={Form}
      className="d-flex flex-column align-items-center"
      onSubmit={handleSubmit}
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
          onChange={handleChange}
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
        {localDropdown()}
      </div>
      <div className="row form-group form-check form-check-inline w-100">
        <label
          className="col-4 font-weight-bold text-right"
          htmlFor="areaGroup"
        >
          Area Group
        </label>
        {areaGroupsDropdown()}
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
          onChange={handleChange}
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
          onChange={handleChange}
          required
        />
      </div>
      <div className="row form-group form-check form-check-inline w-100">
        <label className="col-4 font-weight-bold text-right" htmlFor="cfo">
          CFO
        </label>
        {cfoDropdown()}
      </div>
      <div className="row form-group form-check form-check-inline w-100">
        <label className="col-4 font-weight-bold text-right" htmlFor="officer">
          Officer
        </label>
        {genericDropdown('officer', ['Y', 'N'])}
      </div>
      <div className="row form-group form-check form-check-inline w-100">
        <label className="col-4 font-weight-bold text-right" htmlFor="gender">
          Gender
        </label>
        {genderDropdown()}
      </div>
      <div className="row form-group form-check form-check-inline w-100">
        <label className="col-4 font-weight-bold text-right" htmlFor="isActive">
          Registered in Local
        </label>
        {genericDropdown('isActive', [true, false])}
      </div>
    </Container>
  )
}

export default ChangeMemberForm
