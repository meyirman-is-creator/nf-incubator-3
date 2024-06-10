'use client';

import React, { useEffect, useState } from "react";
import { getPosts } from "../../services/postService";
import PostCard from "../../components/PostCard";
import { Post } from "../../types/post";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
    };

    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("authToken"));
    }

    fetchPosts();
  }, []);

  return (
    <section className="content">
      <div id="content" className=" mx-auto">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Home;
