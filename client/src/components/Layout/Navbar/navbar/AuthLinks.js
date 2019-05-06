import React from 'react';
import { Link } from 'react-router-dom';

const AuthLinks = ({ onLogoutClick }) => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to="/profile">
        Profile
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/">
        Posts
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/login"
        onClick={onLogoutClick}
        className="nav-link"
      >
        Logout
      </Link>
    </li>
  </ul>
);

export default AuthLinks;