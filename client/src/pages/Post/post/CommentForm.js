import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../../components/Inputs/TextAreaFieldGroup/TextAreaFieldGroup';
import { addComment } from '../../../modules/post/postActions';

const CommentForm = props => {
  const [text, setText] = useState('');

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const { user } = props.auth;
    const { postId } = props;

    const newComment = {
      text: text,
      nickname: user.nickname,
      avatar: user.avatar
    };

    props.addComment(postId, newComment);
    setText('');
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">
          Add comment ...
              </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Reply to post"
                name="text"
                value={text}
                onChange={onChange}
                error={props.errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { addComment })(CommentForm);