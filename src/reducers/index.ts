import { combineReducers } from 'redux'
import { directories, isValidDirectory, selectedDirectoryId } from './directories'
import { branches, currentBranchData } from './branches'
import { commits } from './commits'
import { authenticationModals } from './modals'

const rootReducer = combineReducers({
  directories,
  isValidDirectory,
  selectedDirectoryId,
  branches,
  currentBranchData,
  commits, // 現状使っていない
  authenticationModals,
})

export default rootReducer
