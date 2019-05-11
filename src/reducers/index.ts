import { combineReducers } from 'redux'
import { directories, isValidDirectory, selectedDirectoryId } from './directories'
import { branches, currentBranchData } from './branches'
import { commits, latestCommitBody } from './commits'
import { authenticationModals } from './modals'

const rootReducer = combineReducers({
  directories,
  isValidDirectory,
  selectedDirectoryId,
  branches,
  currentBranchData,
  commits,
  latestCommitBody,
  authenticationModals,
})

export default rootReducer
