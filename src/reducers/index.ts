import { combineReducers } from 'redux'
import { directories } from './directories'
import { authenticationModals } from './modals'

const rootReducer = combineReducers({
  directories,
  authenticationModals,
})

export default rootReducer
