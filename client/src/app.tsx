import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import reducers from './reducers'
import thunk from 'redux-thunk'

import Auth from './components/utils/auth'
import SignInPage from './components/pages/SignInPage'
import MyPage from './components/pages/MyPage'

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/signin" component={SignInPage} />
        <Auth>
          <Route exact path="/:userId" component={MyPage} />
        </Auth>
        <Route render={() => <h2>404 Not Found</h2>} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
)
