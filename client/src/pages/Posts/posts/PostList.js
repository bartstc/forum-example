import React from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

const PostList = ({ posts }) => (
  posts.map(post => <PostItem key={post._id} post={post} />)
);

PostList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostList;