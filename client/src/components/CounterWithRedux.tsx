import * as React from 'react'
import { connect } from 'react-redux'
import { increaseCounter, decreaseCounter } from '../actions/counts'

interface Props {
  counts: number
  increaseCounter: any
  decreaseCounter: any
}

const CounterWithRedux: React.FC<Props> = ({
  counts,
  increaseCounter,
  decreaseCounter,
}): JSX.Element => {
  return (
    <p>
      <button onClick={decreaseCounter}>-</button>
      <b>{counts}</b>
      <button onClick={increaseCounter}>+</button>
    </p>
  )
}

export default connect(
  ({ counts }: any) => ({ counts }),
  { increaseCounter, decreaseCounter }
)(CounterWithRedux)
