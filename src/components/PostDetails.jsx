import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, updatePost } from "../redux/postsSlice";

const PostDetails = ({ post }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...post });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(post.id));
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    setForm({ ...post });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePost(form));
    setEditMode(false);
  };

  if (editMode) {
    return (
      <div className="card p-3 mb-4">
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="title"
            className="form-control mb-2"
            value={form.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            className="form-control mb-2"
            value={form.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            className="form-control mb-2"
            value={form.image}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            className="form-control mb-2"
            value={form.category}
            onChange={handleChange}
          />
          <textarea
            name="content"
            className="form-control mb-2"
            value={form.content}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            className="form-control mb-2"
            value={form.date}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-success me-2">Save</button>
          <button type="button" className="btn btn-secondary" onClick={handleEditToggle}>
            Cancel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="card mb-4 shadow-sm">
      {post.image && (
        <img
          src={post.image}
          className="card-img-top"
          alt={post.title}
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="text-muted">{post.date}</p>
        <span className="badge bg-primary mb-2">{post.category}</span>
        <p className="card-text">{post.description}</p>
        <p>{post.content}</p>
        <hr />
        <button className="btn btn-sm btn-warning me-2" onClick={handleEditToggle}>
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
