import axios from 'axios'
import {AddHasAttendedField} from '../utils/attendance'
import history from '../history'
import alertify from 'alertifyjs'

const IMPORT_ACTIVE_MEMBERS = 'IMPORT_ACTIVE_MEMBERS'
const importActiveMembers = members => ({
  type: IMPORT_ACTIVE_MEMBERS,
  payload: {members}
})
export const importActiveMembersThunk = () => async dispatch => {
  try {
    // Refactor for other locals to use
    const data = await (await axios.get(
      '/api/member/local/MANNYUS/ext&active'
    )).data.map(m => AddHasAttendedField(m))
    await axios.post('/api/cache/members', data)
    dispatch(importActiveMembers(data))
  } catch (err) {
    console.error(err)
  }
}

const IMPORT_FROM_SESSION = 'IMPORT_FROM_SESSION'
const importFromSession = (members, reportingPeriod, worshipService) => ({
  type: IMPORT_FROM_SESSION,
  payload: {
    members: members,
    reportingPeriod,
    worshipService
  }
})
export const importFromSessionThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cache')
    if (data.members.length === 0) {
      dispatch(importActiveMembersThunk())
    } else {
      dispatch(
        importFromSession(
          data.members,
          data.reportingPeriod,
          data.worshipService
        )
      )
    }
  } catch (error) {
    console.error(error)
  }
}

export const clearSessionThunk = () => async dispatch => {
  try {
    await axios.get('/api/cache/reset')
    await dispatch(importActiveMembersThunk())
  } catch (error) {
    console.error(error)
  }
}

const UPDATE_MEMBER_ATTENDANCE = 'UPDATE_MEMBER_ATTENDANCE'
const updateMemberAttendance = payload => ({
  type: UPDATE_MEMBER_ATTENDANCE,
  payload
})
export const updateMemberAttendanceThunk = memberId => dispatch => {
  try {
    dispatch(updateMemberAttendance(memberId))
  } catch (error) {
    console.error(error)
  }
}

const CREATE_REPORTING_PERIOD = 'CREATE_REPORTING_PERIOD'
const createReportingPeriod = payload => ({
  type: CREATE_REPORTING_PERIOD,
  payload
})
export const createReportingPeriodThunk = reportingData => async dispatch => {
  try {
    const {data, status} = await axios.post(
      '/api/reporting/create',
      reportingData
    )
    dispatch(createReportingPeriod(data))
    if (status === 200) {
      alertify.success('New Worship Service Attendance Success!')
    } else {
      alertify.error('Error: Unable to create new Worship Service instance')
    }
    history.push('/')
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  local: 'MANNYUS',
  worshipService: {
    id: 0,
    dateTime: new Date(Date.now()).toISOString()
  },
  reportingPeriod: {
    id: 0,
    weekNumber: 1,
    serviceType: 'Special'
  },
  members: []
}

export default (state = initialState, {type, payload}) => {
  let newState = {...state}
  switch (type) {
    case IMPORT_ACTIVE_MEMBERS:
    case IMPORT_FROM_SESSION:
      newState.members = payload.members
      newState.reportingPeriod = payload.reportingPeriod
      newState.worshipService = payload.worshipService
      return newState
    case UPDATE_MEMBER_ATTENDANCE:
      newState.members.find(
        m => m.id === payload
      ).hasAttended = !newState.members.find(m => m.id === payload).hasAttended
      return newState
    case CREATE_REPORTING_PERIOD:
      newState.local = payload.reportingPeriod.localId
      newState.worshipService = payload.worshipService
      newState.reportingPeriod.id = payload.reportingPeriod.id
      newState.reportingPeriod.weekNumber = payload.reportingPeriod.weekNumber
      newState.reportingPeriod.serviceType = payload.reportingPeriod.serviceType
      return newState
    default:
      return state
  }
}
