import axios from 'axios'
import {AddHasAttendedField, UpdateMemberInSession} from '../utils/attendance'
import {ml, config as sampleConfig} from '../../public/sample/121919.js'

const IMPORT_FROM_SAMPLE = 'IMPORT_FROM_SAMPLE'
const importFromSample = (members, config) => ({
  type: IMPORT_FROM_SAMPLE,
  payload: {members, config}
})
export const importFromSampleThunk = () => async dispatch => {
  try {
    const members = ml.map(m => AddHasAttendedField(m))
    const config = sampleConfig
    await axios.post('/api/ws', members)
    dispatch(importFromSample(members, config))
  } catch (err) {
    console.error(err)
  }
}

const IMPORT_FROM_SESSION = 'IMPORT_FROM_SESSION'
const importFromSession = (members, config) => ({
  type: IMPORT_FROM_SESSION,
  payload: {
    members: members,
    config
  }
})
export const importFromSessionThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/ws')
    if (data.length === 0) {
      dispatch(importFromSampleThunk())
    } else {
      dispatch(importFromSession(data, sampleConfig))
    }
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
// 5) More Admin

const initialState = {
  date: new Date(Date.now()),
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
      return newState
    case UPDATE_MEMBER_ATTENDANCE:
      newState.members.find(
        m => m.Id === payload
      ).hasAttended = !newState.members.find(m => m.Id === payload).hasAttended
      return newState
    default:
      return state
  }
}