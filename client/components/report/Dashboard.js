import React, {Component} from 'react'
import {Tab, Nav, Row, Col} from 'react-bootstrap'
import Loading from '../misc/Loading'
import ReportingPane from './ReportingPane'
import {importFromSampleThunk, importFromSessionThunk} from '../../store'
import {connect} from 'react-redux'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  componentDidMount = async () => {
    await this.props.fetchMembersFromSession()
    this.setState({
      isLoading: false
    })
  }

  listAreaGroups = (loading, config) => {
    if (loading) {
      return []
    }
    const {Manhattan, BBExt} = config.Locale
    return Manhattan.AreaGroup.map(ag => `MAN ${ag}`).concat(
      BBExt.AreaGroup.map(ag => `BB ${ag}`)
    )
  }

  render() {
    let {isLoading} = this.state
    let tabs = this.listAreaGroups(isLoading, this.props.config)
    const {mode} = this.props.match.params
    return isLoading ? (
      <Loading />
    ) : (
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
              {tabs.map(t => {
                const areaGroup = t.split(' ')[1]
                const locale =
                  t.split(' ')[0] === 'MAN' ? 'Manhattan' : 'B. Beach Ext'
                return (
                  <Tab.Pane key={t} eventKey={t} title={t}>
                    <ReportingPane
                      areaGroup={areaGroup}
                      locale={locale}
                      mode={mode}
                      members={this.props.members.filter(
                        m =>
                          m.AreaGroup === areaGroup &&
                          m.Local === locale &&
                          (mode === 'absent' ? !m.hasAttended : true)
                      )}
                    />
                  </Tab.Pane>
                )
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    )
  }
}

const mapState = state => ({
  members: state.attendance.members,
  config: state.attendance.config
})

const mapDispatch = dispatch => ({
  fetchMembersFromSample: () => dispatch(importFromSampleThunk()),
  fetchMembersFromSession: () => dispatch(importFromSessionThunk())
})

export default connect(mapState, mapDispatch)(Dashboard)
