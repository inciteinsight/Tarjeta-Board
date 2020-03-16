import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import attendance from './attendanceStore'
import secretary from './secretaryStore'
import local from './congregationStore'
import loading from './loadingStore'

const reducer = combineReducers({user, attendance, secretary, local, loading})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './attendanceStore'
export * from './secretaryStore'
export * from './loadingStore'
export * from './congregationStore'
