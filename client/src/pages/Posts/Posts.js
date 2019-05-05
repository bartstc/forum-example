import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../modules/post/postActions';

import PostForm from './posts/PostForm';
import PostList from './posts/PostList';
import Spinner from '../../components/Spinner/Spinner';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  };

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />
    } else {
      postContent = <PostList posts={posts} />
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.props.isAuthenticated && <PostForm />}
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Posts.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Posts);