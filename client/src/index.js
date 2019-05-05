import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setToken from './utils/setToken';
import { setCurrentUser, logoutUser } from './modules/auth/authActions';

import { store } from './store';
import Root from './store';
import PrivateRoute from './hoc/PrivateRoute';

import Layout from './components/Layout/Layout';
import Posts from './pages/Posts/Posts';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Profile from './pages/Profile/Profile';
import Post from './pages/Post/Post';

// Check for token (was added throught login action)
if (localStorage.jwtToken) {
  // Set auth token header auth
  setToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  };
};

const Index = () => (
  <Root>
    <Router>
      <Layout>
        <Route exact path="/" component={Posts} />
        <Route exact path="/post/:id" component={Post} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Switch>
          <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
      </Layout>
    </Router>
  </Root>
)

ReactDOM.render(<Index />, document.getElementById('root'));