import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import reducers from '../reducers'
import thunk from 'redux-thunk'

import SignInPage from './pages/SignInPage'
import MyPage from './pages/MyPage'

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/:userId" component={MyPage} />
        <Route exact path="/" component={SignInPage} />
        <Route render={() => <h2>404 Not Found</h2>} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
)
