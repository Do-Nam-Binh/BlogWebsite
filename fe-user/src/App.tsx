import "./App.css";
import { Post } from "./types/Post";
import { useState } from "react";
import BlogList from "./components/blogList/BlogList";
import NavBar from "./components/navbar/NavBar";

function App() {
  const [posts, setPosts] = useState<Post[]>([
    {
      _id: "1",
      title: "Testing",
      summary: "Testing for blog card element",
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
    {
      _id: "5",
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
    <>
      <NavBar />
      <BlogList postList={posts} />
    </>
  );
}

export default App;
