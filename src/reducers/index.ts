import { combineReducers } from 'redux'
import {
  directories,
  isValidDirectory,
  selectedDirectoryId,
  selectedDirectoryIdForDiff,
} from './directories'
import { branches, isValidBranch, branchesForDiff } from './branches'
import { authenticationModals } from './modals'

const rootReducer = combineReducers({
  directories,
  isValidDirectory,
  selectedDirectoryId,
  selectedDirectoryIdForDiff,
  branches,
  isValidBranch,
  branchesForDiff,
  authenticationModals,
})

export default rootReducer
