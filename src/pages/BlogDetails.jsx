import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api";

const BlogDetails = () => {
  // Get URL parameter
  const { id } = useParams();

  // Prepare redirect functionality
  const navigate = useNavigate();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery(["blogDetails"], () => {
    return axiosInstance.get(`/blogs/${id}`).then((res) => {
      return res.data;
    });
  });

  if (isError) {
    return <h2>Sorry, something went wrong.</h2>;
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const handleClick = () => {
    axiosInstance.delete(`/blogs/${id}`).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="blog-details">
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>Delete</button>
          <button
            className="edit-button"
            onClick={() => {
              navigate(`/blogs/${id}/edit`);
            }}
          >
            Edit
          </button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
