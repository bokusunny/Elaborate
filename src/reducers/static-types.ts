import { StatusCode } from '../common/static-types/status-code'

export interface ReduxAPIError {
  statusCode: StatusCode | null
  message?: string
}

export interface ReduxAPIStruct<T> {
  status: 'default' | 'fetching' | 'success' | 'failure'
  data: T | null
  error: ReduxAPIError
}

export const errorDefault = (): ReduxAPIError => ({
  statusCode: null,
})

export const defaultSet = <T>(defaultValue?: T): ReduxAPIStruct<T> => ({
  status: 'default',
  data: defaultValue || null,
  error: errorDefault(),
})
