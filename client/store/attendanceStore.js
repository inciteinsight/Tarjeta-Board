import axios from 'axios'
import {AddHasAttendedField, UpdateMemberInSession} from '../utils/attendance'
import {config as sampleConfig} from '../../public/sample/121919.js'
import history from '../history'

// RENAME
const IMPORT_FROM_SAMPLE = 'IMPORT_FROM_SAMPLE'
const importFromSample = (members, config) => ({
  type: IMPORT_FROM_SAMPLE,
  payload: {members, config}
})
export const importFromSampleThunk = () => async dispatch => {
  try {
    // const members = ml.map(m => AddHasAttendedField(m))
    const data = await (await axios.get('/api/member')).data.map(m =>
      AddHasAttendedField(m)
    )
    const config = sampleConfig
    await axios.post('/api/cache/members', data)
    dispatch(importFromSample(data, config))
  } catch (err) {
    console.error(err)
  }
}

const IMPORT_FROM_SESSION = 'IMPORT_FROM_SESSION'
const importFromSession = (members, config, reportingPeriod, currentDate) => ({
  type: IMPORT_FROM_SESSION,
  payload: {
    members: members,
    config,
    reportingPeriod,
    currentDate
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
          sampleConfig,
          data.reportingPeriod,
          data.currentDate
        )
      )
    }
  } catch (error) {
    console.error(error)
  }
}

export const clearSessionThunk = () => async dispatch => {
  try {
    await axios.delete('/api/cache/members')
    await dispatch(importFromSampleThunk())
    history.go('/')
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

// const SAVE_ATTENDANCE = 'SAVE_ATTENDANCE'
// const saveAttendance =

const initialState = {
  local: 'MANNY',
  currentDate: '2020-02-29T09:00:00',
  reportingPeriod: {
    id: 1,
    weekNumber: 1,
    serviceType: 'Special'
  },
  members: [],
  config: {}
}

export default (state = initialState, {type, payload}) => {
  let newState = {...state}
  switch (type) {
    case IMPORT_FROM_SAMPLE:
    case IMPORT_FROM_SESSION:
      newState.members = payload.members
      newState.config = payload.config
      newState.reportingPeriod = payload.reportingPeriod
      newState.currentDate = payload.currentDate
      return newState
    case UPDATE_MEMBER_ATTENDANCE:
      newState.members.find(
        m => m.id === payload
      ).hasAttended = !newState.members.find(m => m.id === payload).hasAttended
      return newState
    case CREATE_REPORTING_PERIOD:
      newState.local = payload.localId
      newState.currentDate = payload.currentDate
      newState.reportingPeriod.id = payload.id
      newState.reportingPeriod.weekNumber = payload.weekNumber
      newState.reportingPeriod.serviceType = payload.serviceType
      return newState
    default:
      return state
  }
}
