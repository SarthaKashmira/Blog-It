import React, { useEffect, useState } from "react";

import Card from "./Blogs/Card";
import PageLoader from "./commons/PageLoader";
import Sidebar from "./Sidebar";

import postsApi from "../apis/posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      logger.info(posts);
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-8 pb-6 pt-2">
        <h1 className="mb-8 text-3xl font-bold">Blog posts</h1>
        <div className="space-y-8">
          {posts.map(post => {
            const details = {
              id: post.id,
              title: post.title,
              description: post.description,
              created_at: post.created_at,
            };

            return <Card key={details.id} {...details} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
