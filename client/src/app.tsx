import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import reducers from './reducers'
import thunk from 'redux-thunk'

import Hello from './components/Hello'

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Hello} />
        <Route render={() => <h2>404 Not Found</h2>} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
)
