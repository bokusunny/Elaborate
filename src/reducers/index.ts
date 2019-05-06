import { combineReducers } from 'redux'
import { directories, isValidDirectory, directoriesStatus } from './directories'
import { branches, isValidBranch } from './branches'
import { authenticationModals } from './modals'

const rootReducer = combineReducers({
  directories,
  isValidDirectory,
  directoriesStatus,
  branches,
  isValidBranch,
  authenticationModals,
})

export default rootReducer
