import "./App.css";
import { useEffect } from "react";
import BlogList from "./pages/blogList/BlogList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./pages/navbar/NavBar";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import CreateBlogPost from "./pages/createBlogPost/CreateBlogPost";
import BlogDetail from "./pages/blogDetail/BlogDetail";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./state/store";
import { fetchPosts } from "./state/post/postSlice";

function App() {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.post
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
            </>
          }
        >
          <Route index element={<BlogList postList={posts} />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="blog/create" element={<CreateBlogPost />} />
          <Route
            path="blog/detail"
            element={
              <BlogDetail
                date={new Date()}
                title="Test 1"
                summary="Test summary"
                content="<p><strong>Bold</strong>, <em>italic</em>, <u>underlined</u>, and <span style='color: red;'>red</span> text.</p>"
                categories={["test1", "test2"]}
                tags={["testtag1"]}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
