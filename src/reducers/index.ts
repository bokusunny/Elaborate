import { combineReducers } from 'redux'
import { directories, isValidDirectory } from './directories'
import { branches } from './branches'
import { authenticationModals } from './modals'

const rootReducer = combineReducers({
  directories,
  isValidDirectory,
  branches,
  authenticationModals,
})

export default rootReducer
