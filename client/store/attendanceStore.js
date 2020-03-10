import axios from 'axios'
import {AddHasAttendedField, UpdateMemberInSession} from '../utils/attendance'
import history from '../history'

// RENAME
const IMPORT_FROM_SAMPLE = 'IMPORT_FROM_SAMPLE'
const importFromSample = members => ({
  type: IMPORT_FROM_SAMPLE,
  payload: {members}
})
export const importFromSampleThunk = () => async dispatch => {
  try {
    const data = await (await axios.get('/api/member/active')).data.map(m =>
      AddHasAttendedField(m)
    )
    await axios.post('/api/cache/members', data)
    dispatch(importFromSample(data))
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
      dispatch(importFromSampleThunk())
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
    await dispatch(importFromSampleThunk())
    // history.go('/service/new')
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
    UpdateMemberInSession(memberId)
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
    const {data} = await axios.post('/api/reporting/create', reportingData)
    dispatch(createReportingPeriod(data))
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
    case IMPORT_FROM_SAMPLE:
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
