import React from 'react';
import { Link } from 'react-router-dom';

const GuestLinks = () => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to="/signup">
        Sign Up
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/signin">
        Sign In
      </Link>
    </li>
  </ul>
);

export default GuestLinks;