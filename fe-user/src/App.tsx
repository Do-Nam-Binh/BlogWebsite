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
import ImageUpload from "./pages/profile/components/image/ImageUpload";
import About from "./pages/aboutPage/About";

function App() {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.post
  );

  const { user } = useSelector((state: RootState) => state.auth);

  let isLoggedIn = false;
  if (user) {
    isLoggedIn = true;
  }

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
              <NavBar isLoggedIn={isLoggedIn} />
            </>
          }
        >
          <Route index element={<BlogList postList={posts} />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="about" element={<About />} />
          <Route path="blog/create" element={<CreateBlogPost />} />
          <Route path="blog/detail/:id" element={<BlogDetail />} />
          <Route path="/testImage" element={<ImageUpload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
