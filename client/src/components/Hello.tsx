import * as React from 'react'
import CounterWithHooks from './CounterWithHooks'
import CounterWithRedux from './CounterWithRedux'

const Hello = (): JSX.Element => (
  <div>
    <h2>Counter with React hooks!</h2>
    <CounterWithHooks />
    <h2>Counter With Redux!</h2>
    <CounterWithRedux />
  </div>
)

export default Hello
