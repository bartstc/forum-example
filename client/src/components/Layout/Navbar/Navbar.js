import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../modules/auth/authActions';
import AuthLinks from './navbar/AuthLinks';
import GuestLinks from './navbar/GuestLinks';

const Navbar = props => {
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
    props.history.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Forum
          </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mobile-nav">
          {props.auth.isAuthenticated ? <AuthLinks onLogoutClick={onLogoutClick} /> : <GuestLinks />}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
  withRouter(Navbar)
);
