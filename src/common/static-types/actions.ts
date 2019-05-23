import { ReduxAPIError } from './api-struct'

export interface BaseAction {
  type: string
  payload: unknown
}

interface FirebaseAPIRequest extends BaseAction {
  type: string
  payload: null
}

export interface FirebaseAPIFailure extends BaseAction {
  type: string
  payload: ReduxAPIError
}

export type FirebaseAPIAction = FirebaseAPIRequest | FirebaseAPIFailure
