import React, { useEffect, useState } from "react";

import { Button } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

import Logout from "./Authentication/Logout";
import Card from "./Blogs/Card";
import Categories from "./Categories";
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
      <Categories />
      <div className="w-screen px-8 pb-6 pt-2">
        {/* This is the header in the home section of showing all the blogs */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Blog posts</h1>
          <div className="flex">
            <Link to="/create_new_post">
              <Button
                className=" bg-black text-white hover:bg-gray-800"
                label="Add New Post"
              />
            </Link>
            <Logout />
          </div>
        </div>
        <div className="space-y-8">
          {posts.map(post => {
            const details = {
              id: post.id,
              title: post.title,
              description: post.description,
              created_at: post.created_at,
              slug: post.slug,
              user_name: post.user.name,
              categories: post.categories,
            };

            return <Card key={details.id} {...details} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
