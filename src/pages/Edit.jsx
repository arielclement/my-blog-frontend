import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api";
import { useQuery, useMutation } from "@tanstack/react-query";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("John");

  // Get URL parameter
  const { id } = useParams();

  // Prepare redirect functionality
  const navigate = useNavigate();

  // Fetch blog details
  useQuery(["blogDetails"], () => {
    return axiosInstance.get(`/blogs/${id}`).then((res) => {
      setTitle(res.data.title);
      setBody(res.data.body);
      setAuthor(res.data.author);
      return res.data;
    });
  });

  // Prepare for PATCH request
  const createPostMutation = useMutation({
    mutationFn: (blog) => {
      axiosInstance.patch(`/blogs/${id}`, blog).then(() => navigate("/"));
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
      <h2>Edit Blog</h2>
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
        <button disabled={createPostMutation.isLoading}>Edit Blog</button>
      </form>
    </div>
  );
};

export default Edit;
