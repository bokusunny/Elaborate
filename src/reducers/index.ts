import { combineReducers } from 'redux'
import { directories, isValidDirectory } from './directories'
import { branches, isValidBranch } from './branches'
import { authenticationModals } from './modals'

const rootReducer = combineReducers({
  directories,
  isValidDirectory,
  branches,
  isValidBranch,
  authenticationModals,
})

export default rootReducer
