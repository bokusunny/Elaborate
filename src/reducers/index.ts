import { combineReducers } from 'redux'
import { directories, currentDirectory, selectedDirectoryId } from './directories'
import { branches, currentBranch } from './branches'
import { diffLeftFile, diffRightFile } from './diff'
import { commits } from './commits'
import { authenticationModals } from './modals'

const rootReducer = combineReducers({
  directories,
  currentDirectory,
  selectedDirectoryId,
  branches,
  currentBranch,
  diffLeftFile,
  diffRightFile,
  commits, // 現状使っていない
  authenticationModals,
})

export default rootReducer
