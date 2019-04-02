import { actionTypes } from '../constants'

// TSにおいてanyは厳禁だが、この関数は確認用でmasterにマージされることはないので許容
export const counts = (state: number = 0, action: any): number => {
  switch (action.type) {
    case actionTypes.COUNT_INCREASE:
      return state + 1

    case actionTypes.COUNT_DECREASE:
      return state - 1

    default:
      return state
  }
}
