import { combineReducers } from 'redux'
import { directories, isValidDirectory, selectedDirectoryId } from './directories'
import { branches, currentBranchData } from './branches'
import { diffLeftFile, diffRightFile } from './diff'
import { authenticationModals } from './modals'

const rootReducer = combineReducers({
  directories,
  isValidDirectory,
  selectedDirectoryId,
  branches,
  currentBranchData,
  diffLeftFile,
  diffRightFile,
  authenticationModals,
})

export default rootReducer
