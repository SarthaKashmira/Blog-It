import React, { useEffect, useState } from "react";

import { Button, Input, Select, Typography } from "@bigbinary/neetoui";

import { statusOptions } from "./constants";

import categoriesApi from "../../../apis/categories";
import postsApi from "../../../apis/posts";
import PageLoader from "../../commons/PageLoader";

const PaneContent = ({ setMyBlogs, setOpenPane }) => {
  const [title, setTitle] = useState("Rails 8");
  const [categories, setCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [status, setStatus] = useState({ value: "draft", label: "Draft" });
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();

      setCategoryOptions(
        categories.map(category => ({
          value: category.id,
          label: category.name,
        }))
      );
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch({
        title,
        categories: categories.map(category => category.value),
        status: status.value,
        query: "my_blogs",
      });
      setMyBlogs(posts);
      setOpenPane(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    <PageLoader />;
  }

  return (
    <div className="max-w-md rounded-lg bg-white p-6">
      <Typography className="mb-6" style="h2">
        Filters
      </Typography>
      <div className="mb-6">
        <Typography className="mb-2" style="body2">
          Title
        </Typography>
        <Input
          placeholder="Enter title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Typography className="mb-2" style="body2">
          Category
        </Typography>
        <Select
          isMulti
          options={categoryOptions}
          placeholder="Select categories"
          value={categories}
          onChange={setCategories}
        />
      </div>
      <div className="mb-6">
        <Typography className="mb-2" style="body2">
          Status
        </Typography>
        <Select
          options={statusOptions}
          placeholder="Select status"
          value={status}
          onChange={setStatus}
        />
      </div>
      <div className="flex justify-end">
        <Button
          className="bg-black text-white"
          label="Submit"
          style="primary"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default PaneContent;
