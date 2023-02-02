import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api";
import { useMutation } from "@tanstack/react-query";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("John");

  // Prepare redirect functionality
  const navigate = useNavigate();

  // Prepare for POST request
  const createPostMutation = useMutation({
    mutationFn: (blog) => {
      axiosInstance.post("/blogs", blog).then(() => navigate("/"));
    },
  });

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate({ title, body, author });
  };

  if (createPostMutation.isError) {
    return <h2>Sorry, something went wrong.</h2>;
  }

  if (createPostMutation.isLoading) {
    return <h2>Creating a new blog...</h2>;
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="John">John</option>
          <option value="Mark">Mark</option>
        </select>
        <button disabled={createPostMutation.isLoading}>Add Blog</button>
      </form>
    </div>
  );
};

export default Create;
