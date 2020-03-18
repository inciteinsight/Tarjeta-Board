import axios from 'axios'

const GET_ALL_LOCALS = 'GET_ALL_LOCALS'
const getAllLocals = payload => ({
  type: GET_ALL_LOCALS,
  payload
})
export const getAllLocalsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/congregation')
    dispatch(getAllLocals(data))
  } catch (error) {
    console.error(error)
  }
}

const GET_ACCESSIBLE_LOCALS = 'GET_ACCESSIBLE_LOCALS'
const getAccessibleLocals = payload => ({
  type: GET_ACCESSIBLE_LOCALS,
  payload
})
export const getAccessibleLocalsThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/congregation/user/${userId}`)
    dispatch(getAccessibleLocals(data))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  locals: []
}

export default (state = initialState, {type, payload}) => {
  let newState = {...state}
  switch (type) {
    case GET_ALL_LOCALS:
    case GET_ACCESSIBLE_LOCALS:
      newState.locals = payload
      return newState
    default:
      return state
  }
}
