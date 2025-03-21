import React, { useEffect, useState } from "react";

import { Calendar, Download, Edit, User } from "@bigbinary/neeto-icons";
import { Avatar, Tag, Typography } from "@bigbinary/neetoui";
import { useParams, Link } from "react-router-dom";

import { PageLoader, Toastr } from "./commons";

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

  const generatePdf = async () => {
    try {
      await postsApi.generatePdf(postShow.slug);
    } catch (error) {
      logger.error(error);
    }
  };

  const saveAs = ({ blob, fileName }) => {
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 150);
  };

  const downloadPdf = async () => {
    try {
      Toastr.success("Downloading report...");
      const { data } = await postsApi.download(postShow.slug);
      saveAs({ blob: data, fileName: "granite_task_report.pdf" });
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  const handleDownload = () => {
    try {
      generatePdf();
      setTimeout(() => {
        downloadPdf();
      }, 5000);
    } catch (error) {
      logger.error(error);
    }
  };

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
            <Download onClick={handleDownload} />
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
