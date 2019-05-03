import { combineReducers } from 'redux'
import { directories, isValidDirectory } from './directories'
import { authenticationModals } from './modals'

const rootReducer = combineReducers({
  directories,
  isValidDirectory,
  authenticationModals,
})

export default rootReducer
