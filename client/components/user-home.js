import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Board from './Board'
import {Tabs, Tab} from 'react-bootstrap'
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
    <Tabs
      variant="pills"
      defaultActiveKey={tabs[0]}
      transition={false}
      id="noanim-tab-example"
    >
      {tabs.map(t => (
        <Tab transition key={t} eventKey={t} title={t}>
          <Board
            areaGroup={t.split(' ')[1]}
            locale={t.split(' ')[0] === 'MAN' ? 'Manhattan' : 'B. Beach Ext'}
          />
        </Tab>
      ))}
    </Tabs>
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
