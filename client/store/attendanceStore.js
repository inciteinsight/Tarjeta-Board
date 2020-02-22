import axios from 'axios'
import {AddHasAttendedField} from '../utils/attendance'
import {ml, config as sampleConfig} from '../../public/sample/121919.js'

const IMPORT_FROM_SAMPLE = 'IMPORT_FROM_SAMPLE'
const importFromSample = () => ({
  type: IMPORT_FROM_SAMPLE,
  payload: {
    members: ml.map(m => AddHasAttendedField(m)),
    config: sampleConfig
  }
})
export const importFromSampleThunk = () => dispatch => {
  try {
    dispatch(importFromSample())
  } catch (err) {
    console.error(err)
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

// Check List:

// 1) Import From Excel File
// 2) Update Via Manual Entry
// 3) Send Finalized Report via email (Java)

const initialState = {
  date: new Date(Date.now()),
  members: []
}

export default (state = initialState, {type, payload}) => {
  let newState = {...state}
  switch (type) {
    case IMPORT_FROM_SAMPLE:
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
