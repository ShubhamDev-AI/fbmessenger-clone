import React, { Component } from 'react'
import './styles.css'
import { auth } from './services/firebase'
import Home from './pages/Home'
import {
  Route, Redirect,
  Switch, BrowserRouter as Router
} from 'react-router-dom'
import Chat from './pages/Chat'
import Signup from './pages/Signup'
import Login from './pages/Login'

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}
function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/chat' />}
    />
  )
}

class App extends Component {
  state = {
    authenticated: false,
    loading: true,
  }
  componentDidMount() {
    //1) auth().onAuthStateChanged()
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        })
      }
    })
  }

  render() {
    const { authenticated, loading } = this.state
    return loading === true ? <h2>Loading...</h2> : (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/chat" authenticated={authenticated} component={Chat} />
          <PublicRoute path="/login" authenticated={authenticated} component={Login} />
          <PublicRoute path="/signup" authenticated={authenticated} component={Signup} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    )
  }
}
const NoMatch = ({ location }) =>
  <h1>404. No route match for {location.pathname}</h1>

export default App
