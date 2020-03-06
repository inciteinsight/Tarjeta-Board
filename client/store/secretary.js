import axios from 'axios'
import history from '../history'

const GET_ACCESS_FROM_SESSION = 'GET_ACCESS_FROM_SESSION'
const getAccessFromSession = isSecretary => ({
  type: GET_ACCESS_FROM_SESSION,
  payload: {isSecretary}
})
export const getAccessFromSessionThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cache/secAccess')
    dispatch(getAccessFromSession(data.isSecretary))
  } catch (error) {
    console.error(error)
  }
}

const UPDATE_SECRETARY_MODE = 'UPDATE_SECRETARY_MODE'
const updateSecretaryMode = isSecretary => ({
  type: UPDATE_SECRETARY_MODE,
  payload: {isSecretary}
})

export const updateSecretaryModeThunk = () => async dispatch => {
  try {
    const {data} = await axios.put('/api/cache/secAccess')
    await dispatch(updateSecretaryMode(data.isSecretary))
    history.push('/')
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
    case GET_ACCESS_FROM_SESSION:
      newState.isSecretary = payload.isSecretary
      return newState
    default:
      return state
  }
}
