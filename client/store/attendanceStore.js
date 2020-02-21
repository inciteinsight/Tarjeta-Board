import axios from 'axios'
import {ml} from '../../public/sample/121919.js'

const IMPORT_FROM_SAMPLE = 'IMPORT_FROM_SAMPLE'
const importFromSample = () => ({
  type: IMPORT_FROM_SAMPLE,
  attendance: ml
})
export const importFromSampleReducer = () => dispatch => {
  try {
    dispatch(importFromSample())
  } catch (err) {
    console.error(err)
  }
}

// Check List:

// 1) Import From Excel File
// 2) Update Via Manual Entry
// 3) Send Finalized Report via email (Java)

const initialState = {
  date: new Date(Date.now()),
  attendance: []
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case IMPORT_FROM_SAMPLE:
      return {...state, ...payload}
    default:
      return state
  }
}
