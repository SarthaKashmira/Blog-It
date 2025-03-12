import React, { useEffect, useState } from "react";

import { Calendar, Edit, User } from "@bigbinary/neeto-icons";
import { Avatar, Tag, Typography } from "@bigbinary/neetoui";
import { useParams, Link } from "react-router-dom";

import { PageLoader } from "./commons";

import postsApi from "../apis/posts";

const DetailedBlog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [postShow, setPostShow] = useState({});
  const { slug } = useParams();
  const fetchPostDetails = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setIsLoading(false);
      setPostShow(post);
      logger.info(post);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex ">
      <div className="w-auto p-6">
        <div className=" p-4">
          <div className="mb-3 flex gap-2">
            {postShow.categories.map((category, index) => (
              <Tag
                className="m-1"
                key={index}
                label={category.name}
                style="success"
                type="outline"
              />
            ))}
          </div>
          <div className="flex justify-between space-x-4">
            <Typography className="mb-4" component="h1" style="h2">
              {postShow.title}
            </Typography>
            {postShow.status === "draft" && (
              <Tag
                className="mb-4"
                label={postShow.status}
                style="danger"
                type="outline"
              />
            )}
            <Link to={`/edit_post/${postShow.slug}`}>
              <Edit />
            </Link>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <Avatar
              user={{
                name: postShow.user.name,
              }}
              onClick={function noRefCheck() {}}
            />
            <div className="flex-col items-center">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <Typography component="span" style="body2">
                  {postShow.user.name}
                </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <Typography component="span" style="body2">
                  {postShow.created_at.split("T")[0]}
                </Typography>
              </div>
            </div>
          </div>
          <Typography className="mt-2">{postShow.description}</Typography>
        </div>
      </div>
    </div>
  );
};

export default DetailedBlog;
