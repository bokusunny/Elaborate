import { ReduxAPIError } from './api-struct'

export interface BaseAction {
  type: string
  payload?: any
}

export interface FirebaseAPIRequest extends BaseAction {
  type: string
}

export interface FirebaseAPIFailure extends BaseAction {
  type: string
  payload: { error: ReduxAPIError }
}
