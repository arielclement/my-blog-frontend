import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Create from "./pages/Create";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogDetails from "./pages/BlogDetails";
import Edit from "./pages/Edit";

function App() {
  const client = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="blogs/:id/edit" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
