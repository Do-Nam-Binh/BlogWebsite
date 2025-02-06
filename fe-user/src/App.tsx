import "./App.css";
import { Post } from "./types/Post";
import { useState } from "react";
import BlogList from "./pages/blogList/BlogList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./pages/navbar/NavBar";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import CreateBlogPost from "./pages/createBlogPost/createBlogPost";

function App() {
  const [posts] = useState<Post[]>([
    {
      _id: "1",
      title: "Testing",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies porta tempor. Etiam ut erat condimentum, accumsan orci vel, dignissim lorem. Donec vehicula posuere justo, at semper neque bibendum at. Nullam a enim eu enim vehicula vestibulum sed nec justo. Morbi molestie nulla id porta egestas. Maecenas vehicula diam at ipsum efficitur, id tristique quam mollis. Integer sagittis dolor ut convallis hendrerit. Maecenas efficitur ante at condimentum pulvinar. Nam varius, sapien non ultricies hendrerit, ante diam porttitor sem, eget iaculis urna odio eget lorem. Morbi dapibus in libero nec consectetur. Ut lacinia molestie ex lacinia suscipit. Aenean scelerisque quis metus in pharetra. Duis et aliquam velit, facilisis ullamcorper turpis. Nunc pharetra ultrices lorem, ac eleifend tellus consectetur eu. Cras luctus ante ac quam vestibulum tincidunt. Suspendisse auctor laoreet lorem, ac finibus elit dapibus vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies porta tempor. Etiam ut erat condimentum, accumsan orci vel, dignissim lorem. Donec vehicula posuere justo, at semper neque bibendum at. Nullam a enim eu enim vehicula vestibulum sed nec justo. Morbi molestie nulla id porta egestas. Maecenas vehicula diam at ipsum efficitur, id tristique quam mollis. Integer sagittis dolor ut convallis hendrerit. Maecenas efficitur ante at condimentum pulvinar. Nam varius, sapien non ultricies hendrerit, ante diam porttitor sem, eget iaculis urna odio eget lorem. Morbi dapibus in libero nec consectetur. Ut lacinia molestie ex lacinia suscipit. Aenean scelerisque quis metus in pharetra. Duis et aliquam velit, facilisis ullamcorper turpis. Nunc pharetra ultrices lorem, ac eleifend tellus consectetur eu. Cras luctus ante ac quam vestibulum tincidunt. Suspendisse auctor laoreet lorem, ac finibus elit dapibus vel. ",
      content: "This is a test content for the blog post.",
      categories: ["cate1", "cate2"],
      tags: ["tag1", "tag2"],
      visibility: true,
      likes: 10,
      reactions: new Map([
        ["like", 5],
        ["love", 3],
      ]),
      postedDate: new Date(),
    },
    {
      _id: "2",
      title: "Testing2",
      summary: "Testing 2 for blog card element",
      content: "This is a test 2 content for the blog post.",
      categories: ["cate1", "cate2"],
      tags: ["tag1", "tag2"],
      visibility: true,
      likes: 10,
      reactions: new Map([
        ["like", 5],
        ["love", 3],
      ]),
      postedDate: new Date(),
    },
    {
      _id: "3",
      title: "Testing2",
      summary: "Testing 2 for blog card element",
      content: "This is a test 2 content for the blog post.",
      categories: ["cate1", "cate2"],
      tags: ["tag1", "tag2"],
      visibility: true,
      likes: 10,
      reactions: new Map([
        ["like", 5],
        ["love", 3],
      ]),
      postedDate: new Date(),
    },
    {
      _id: "4",
      title: "Testing2",
      summary: "Testing 2 for blog card element",
      content: "This is a test 2 content for the blog post.",
      categories: ["cate1", "cate2"],
      tags: ["tag1", "tag2"],
      visibility: true,
      likes: 10,
      reactions: new Map([
        ["like", 5],
        ["love", 3],
      ]),
      postedDate: new Date(),
    },
  ]);

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
