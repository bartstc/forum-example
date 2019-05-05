import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount } from '../../modules/auth/authActions';

class Profile extends Component {
  onDeleteClick = () => {
    this.props.deleteAccount();
    this.props.history.push('/signin');
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <h2 className="lead text-muted">Welcome {user.nickname}</h2>
                <p>It's nice to have you back!</p>
                <button onClick={this.onDeleteClick} className="btn btn-danger">Delete My Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Profile.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteAccount })(Profile);
