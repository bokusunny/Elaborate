import { combineReducers } from 'redux'
import { directories } from './directories'
import { authentications } from './authentications'

const rootReducer = combineReducers({
  directories,
  authentications,
})

export default rootReducer
