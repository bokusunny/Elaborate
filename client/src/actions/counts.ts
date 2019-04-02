import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../constants'

export const increaseCounter = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch({ type: actionTypes.COUNT_INCREASE })
  }
}

export const decreaseCounter = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch({ type: actionTypes.COUNT_DECREASE })
  }
}
