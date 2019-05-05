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
      <a
        href=""
        onClick={onLogoutClick}
        className="nav-link"
      >
        Logout
      </a>
    </li>
  </ul>
);

export default AuthLinks;