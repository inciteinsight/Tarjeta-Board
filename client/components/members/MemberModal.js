import React, {Component, Fragment} from 'react'
import {Modal, Button, Container, Form} from 'react-bootstrap'
import ConfirmWithPassword from '../misc/ConfirmWithPassword'
import {CFO} from '../../utils/board'
import {connect} from 'react-redux'
import axios from 'axios'
import alertify from 'alertifyjs'
import {GenericDropdown} from '../misc/dropdowns'

class MemberModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      isDeleting: false,
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

  handleGenderChange = async e => {
    await this.handleChange(e)
    this.handleIdByGender()
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
      alertify.error(`Error. Id exists as ${data.firstName} ${data.lastName}`)
    } else {
      onHide()
      setTimeout(() => {
        history.go('/control/members')
      }, 500)
    }
  }

  handleDelete = () => {
    const {id} = this.state
    const {onHide} = this.props
    axios.delete(`/api/member/${id}`)
    onHide()
    setTimeout(() => {
      history.go('/control/members')
    }, 100)
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

  confirmClose = () => this.setState({isDeleting: false})

  render() {
    const {isLoading, id, localId, lastName, firstName, isDeleting} = this.state
    const {onHide, mode, worshipService, member, locals} = this.props

    if (isLoading) return <div />

    if (isDeleting) {
      return (
        <ConfirmWithPassword
          title="Deleting Member"
          message={`Are you sure you want to delete ${firstName} ${lastName}? All attendance records will be wiped out. This cannot be reversed.
          Alternatively, you can untrack a member changing the Local Registration dropdown - Past attendances will be preserved.`}
          secPass={true}
          show={isDeleting}
          onHide={this.confirmClose}
          buttonMessage="Confirm Delete"
          trigger={this.handleDelete}
        />
      )
    }

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
              <GenericDropdown
                defaultProperty={member.localId}
                handleChange={this.handleChange}
                property="localId"
                options={Object.keys(locals)}
                labels={Object.keys(locals).map(l => locals[l].name)}
              />
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="areaGroup"
              >
                Area Group
              </label>
              <GenericDropdown
                defaultProperty={member.areaGroup}
                handleChange={this.handleChange}
                property="areaGroup"
                options={locals[localId].areaGroups}
              />
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
              <GenericDropdown
                defaultProperty={member.cfo}
                handleChange={this.handleChange}
                property="cfo"
                options={Object.keys(CFO)}
                labels={Object.keys(CFO).map(k => CFO[k])}
              />
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="officer"
              >
                Officer
              </label>
              <GenericDropdown
                defaultProperty={member.officer}
                handleChange={this.handleChange}
                property="officer"
                options={['Y', 'N']}
              />
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="gender"
              >
                Gender
              </label>
              <GenericDropdown
                defaultProperty={member.gender}
                handleChange={this.handleGenderChange}
                property="gender"
                options={['M', 'F']}
                labels={['Male', 'Female']}
              />
            </div>
            <div className="row form-group form-check form-check-inline w-100">
              <label
                className="col-4 font-weight-bold text-right"
                htmlFor="isActive"
              >
                Registered in Local
              </label>
              <GenericDropdown
                defaultProperty={member.isActive}
                handleChange={this.handleChange}
                property="isActive"
                options={[true, false]}
              />
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={this.handleSave}>
            Save
          </Button>
          {mode === 'update' ? (
            <Fragment>
              <Button variant="warning" onClick={this.reset}>
                Reset Form
              </Button>
              <Button
                variant="danger"
                disabled={worshipService.id > 0}
                onClick={() => this.setState({isDeleting: true})}
              >
                Permanent Delete
              </Button>
            </Fragment>
          ) : (
            <div />
          )}
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapState = state => ({
  worshipService: state.attendance.worshipService
})

export default connect(mapState)(MemberModal)
