// BlogPostPage.tsx
import React from 'react';


interface MatchParams {
  postId: string;
}

const BlogPostPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const postId = match.params.postId;

  // Fetch and display the blog post content based on postId

  return (
    <div>
      <h2>Blog Post {postId}</h2>
      {/* Display the content of the blog post here */}
    </div>
  );
};

export default BlogPostPage;
