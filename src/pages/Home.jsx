import axiosInstance from "../api";
import { useQuery } from "@tanstack/react-query";
import BlogList from "../components/BlogList";

const Home = () => {
  const { data, isLoading, isError } = useQuery(["blogs"], () => {
    return axiosInstance.get("/blogs").then((res) => {
      return res.data;
    });
  });

  if (isError) {
    return <h2>Sorry, something went wrong.</h2>;
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="home">
      {data && <BlogList blogs={data} title="All Blogs" />}
    </div>
  );
};

export default Home;
