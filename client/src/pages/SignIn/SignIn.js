import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../modules/auth/authActions';
import TextFieldGroup from '../../components/Inputs/TextFieldGroup/TextFieldGroup';

const initialState = {
  email: '',
  password: '',
};

const Login = ({ loginUser, errors: { email, password }, auth: { isAuthenticated } }) => {
  const [state, setState] = useState(initialState);

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: state.email,
      password: state.password
    };

    loginUser(userData);
  };

  if (isAuthenticated) return <Redirect to="/profile" />;

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your account
              </p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={state.email}
                onChange={onChange}
                error={email}
              />
              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={state.password}
                onChange={onChange}
                error={password}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
