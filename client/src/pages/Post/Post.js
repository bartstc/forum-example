import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { getPost } from '../../modules/post/postActions';
import CommentForm from './post/CommentForm';
import CommentFeed from './post/CommentsList';
import PostItem from '../Posts/posts/PostItem';

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  };

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    // Object.keys(post).length - is post a empty obj
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />
    } else {
      postContent = (
        <div>
          <h6>Added by {post.nickname}</h6>
          <PostItem post={post} showActions={false} />
          <CommentFeed postId={post._id} comments={post.comments} />
          {this.props.auth.isAuthenticated && <CommentForm postId={post._id} />}
        </div>
      );
    };

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/" className="btn btn-light mb-3">Back</Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPost })(Post);