import { combineReducers } from 'redux'
import { directories, isValidDirectory, selectedDirectoryId } from './directories'
import { branches, currentBranchData, selectedBranchId } from './branches'
import { authenticationModals } from './modals'

const rootReducer = combineReducers({
  directories,
  isValidDirectory,
  selectedDirectoryId,
  branches,
  currentBranchData,
  selectedBranchId,
  authenticationModals,
})

export default rootReducer
