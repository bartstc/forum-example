import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../../modules/post/postActions';

const CommentItem = props => {
  const onDeleteClick = (postId, commentId) => {
    props.deleteComment(postId, commentId);
  };

  const { comment, postId, auth } = props;

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-12">
          <p className="font-italic font-weight-light">Added by {comment.nickname}</p>
          <p><small className="font-weight-light">{comment.text}</small></p>
          {comment.user === auth.user.id ? (
            <button onClick={() => onDeleteClick(postId, comment._id)} type="button" className="btn btn-danger mr-1">
              <i className="fas fa-times" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);