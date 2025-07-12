import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postsSlice"; 
import PostDetails from "./PostDetails";

const PostList = () => {
  const dispatch = useDispatch();
  const { items: posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-6" key={post.id}>
            <PostDetails post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
