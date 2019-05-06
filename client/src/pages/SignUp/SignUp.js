import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../modules/auth/authActions';
import TextFieldGroup from '../../components/Inputs/TextFieldGroup/TextFieldGroup';

const initialState = {
  nickname: '',
  email: '',
  password: '',
  password2: ''
};

const Register = ({ registerUser, history, errors, auth }) => {
  const [state, setState] = useState(initialState);

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    const newUser = {
      nickname: state.nickname,
      email: state.email,
      password: state.password,
      password2: state.password2
    };

    registerUser(newUser, history);
  }

  const { nickname, email, password, password2 } = errors;

  if (auth.isAuthenticated) return <Redirect to="/profile" />

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">
              Create account
              </p>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Nickname"
                name="nickname"
                value={state.nickname}
                onChange={onChange}
                error={nickname}
              />
              <TextFieldGroup
                placeholder="Email"
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
              <TextFieldGroup
                placeholder="Confirm Password"
                name="password2"
                type="password"
                value={state.password2}
                onChange={onChange}
                error={password2}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
