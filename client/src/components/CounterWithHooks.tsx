import * as React from 'react'
const { useState } = React

const CounterWithHooks = (): JSX.Element => {
  const [count, setCount] = useState(0)
  return (
    <p>
      <button onClick={() => setCount(count - 1)}>-</button>
      <b>{count}</b>
      <button onClick={() => setCount(count + 1)}>+</button>
    </p>
  )
}

export default CounterWithHooks
