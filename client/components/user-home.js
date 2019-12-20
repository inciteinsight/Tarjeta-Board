import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Board from './Board'
import {Tabs, Tab, Nav, Row, Col} from 'react-bootstrap'
import {ml, config} from '../../public/sample/121919'
const {Manhattan, BBExt} = config.Locale

/**
 * COMPONENT
 */

export const UserHome = props => {
  const {email} = props
  let tabs = Manhattan.AreaGroup.map(ag => `MAN ${ag}`).concat(
    BBExt.AreaGroup.map(ag => `BB ${ag}`)
  )
  return (
    // <Tabs
    //   variant="pills"
    //   defaultActiveKey={tabs[0]}
    //   transition={false}
    //   id="noanim-tab-example"
    // >
    //   {tabs.map(t => (
    //     <Tab transition key={t} eventKey={t} title={t}>
    //       <Board
    //         areaGroup={t.split(' ')[1]}
    //         locale={t.split(' ')[0] === 'MAN' ? 'Manhattan' : 'B. Beach Ext'}
    //       />
    //     </Tab>
    //   ))}
    // </Tabs>

    <Tab.Container id="left-tabs-example" defaultActiveKey={tabs[0]}>
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            {tabs.map(t => (
              <Nav.Item key={t}>
                <Nav.Link eventKey={t}>{t}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            {tabs.map(t => (
              <Tab.Pane key={t} eventKey={t} title={t}>
                <Board
                  areaGroup={t.split(' ')[1]}
                  locale={
                    t.split(' ')[0] === 'MAN' ? 'Manhattan' : 'B. Beach Ext'
                  }
                />
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
