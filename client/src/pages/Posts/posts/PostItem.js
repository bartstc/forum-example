import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../../../modules/post/postActions';

const PostItem = ({ post, auth, showActions, deletePost }) => {
  const onDeleteClick = id => {
    deletePost(id);
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-12">
          <p className="lead">{post.text}</p>
          {showActions ? (
            <span>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
                </Link>
              {post.user === auth.user.id ? (
                <button onClick={() => onDeleteClick(post._id)} type="button" className="btn btn-danger mr-1">
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost })(PostItem);