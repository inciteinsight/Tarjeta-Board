import React from 'react'
import {Nav} from 'react-bootstrap'

const TabNav = ({tabs}) => (
  <Nav variant="pills" className="flex-row flex-wrap">
    {tabs.map(t => (
      <Nav.Item key={t}>
        <Nav.Link eventKey={t}>{t}</Nav.Link>
      </Nav.Item>
    ))}
  </Nav>
)

export default TabNav
