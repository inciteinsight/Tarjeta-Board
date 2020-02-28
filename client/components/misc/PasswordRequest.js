import React from 'react'
import {Form} from 'react-bootstrap'

const PasswordRequest = ({handlePasswordChange}) => (
  <Form>
    <Form.Group controlId="formBasicPassword" className="d-flex flex-row">
      <Form.Label>Secretary Password: </Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
      />
    </Form.Group>
  </Form>
)

export default PasswordRequest
