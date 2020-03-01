import axios from 'axios'
import {AddHasAttendedField, UpdateMemberInSession} from '../utils/attendance'
import {ml, config as sampleConfig} from '../../public/sample/121919.js'
import history from '../history'

const UPDATE_SECRETARY_MODE = 'UPDATE_SECRETARY_MODE'
const updateSecretaryMode = () => ({
  type: UPDATE_SECRETARY_MODE
})
export const updateSecretaryModeThunk = () => async dispatch => {
  try {
    dispatch(updateSecretaryMode())
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  isSecretary: false
}

export default (state = initialState, {type, payload}) => {
  let newState = {...state}
  switch (type) {
    case UPDATE_SECRETARY_MODE:
      newState.isSecretary = !state.isSecretary
      return newState
    default:
      return state
  }
}
