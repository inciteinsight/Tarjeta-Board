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
const importFromSession = (members, config, currentDate) => ({
  type: IMPORT_FROM_SESSION,
  payload: {
    members: members,
    config,
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
          Object.keys(data.currentDate)[0]
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

const SET_WORSHIP_SERVICE_DATETIME = 'SET_WORSHIP_SERVICE_DATETIME'
const setWorshipServiceDateTime = currentDate => ({
  type: SET_WORSHIP_SERVICE_DATETIME,
  payload: {currentDate}
})
export const setWorshipServiceDateTimeThunk = currentDate => async dispatch => {
  try {
    const {data} = await axios.put('/api/cache/currentDate', currentDate)
    await dispatch(setWorshipServiceDateTime(Object.keys(data.currentDate)[0]))
    history.push('/')
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

// Check List:

// 2) Import From Excel File
// 3) Update Via Manual Entry
// 4) Send Finalized Report via email (Java)

const initialState = {
  currentDate: '2020-02-29T09:00:00',
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
      newState.currentDate = payload.currentDate
      return newState
    case SET_WORSHIP_SERVICE_DATETIME:
      newState.currentDate = payload.currentDate
      return newState
    case UPDATE_MEMBER_ATTENDANCE:
      newState.members.find(
        m => m.id === payload
      ).hasAttended = !newState.members.find(m => m.id === payload).hasAttended
      return newState
    default:
      return state
  }
}
