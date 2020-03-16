const initialState = {
  appInitialized: false
}

const LOAD_COMPLETE = 'LOAD_COMPLETE'
const loadComplete = () => ({
  type: LOAD_COMPLETE,
  payload: {
    appInitialized: true
  }
})
export const loadCompleteThunk = () => dispatch => {
  try {
    dispatch(loadComplete())
  } catch (error) {
    console.error(error)
  }
}

export default (state = initialState, {type, payload}) => {
  let newState = {...state}
  switch (type) {
    case LOAD_COMPLETE:
      newState.appInitialized = payload.appInitialized
      return newState
    default:
      return state
  }
}
