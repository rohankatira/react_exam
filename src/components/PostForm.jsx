import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/postsSlice";

const PostForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
    category: "",
    content: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and Description are required.");
      return;
    }

    setError("");

    await dispatch(addPost(form));


    setForm({
      title: "",
      description: "",
      date: "",
      image: "",
      category: "",
      content: "",
    });
  };

  return (
    <div className="container my-4">
      <h4>Add New Post</h4>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="5"
            value={form.content}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Submit Post</button>
      </form>
    </div>
  );
};

export default PostForm;
