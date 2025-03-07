import React, { useEffect, useState } from "react";

import { Input, Select } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";

import PageLoader from "./commons/PageLoader";
import Sidebar from "./Sidebar";

import categoriesApi from "../apis/categories";
import postsApi from "../apis/posts";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoriesShow, setCategoriesShow] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const history = useHistory();
  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({
        title,
        description,
        is_bloggable: false,
        category_ids: selectedCategories.map(category => category.value),
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategoriesShow(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">New blog post</h1>
        <div className="rounded-lg bg-white p-8 shadow-md">
          <form onSubmit={handleSubmit}>
            <Input
              className="mb-6"
              label="Title *"
              placeholder="Enter title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Select
              isClearable
              isSearchable
              addButtonLabel="Add"
              className="mb-6"
              isMulti="true"
              label="Select Categories"
              name="ValueList"
              placeholder="Select an option"
              storyName="Multi Select"
              strategy="fixed"
              options={categoriesShow.map(category => ({
                label: category.name,
                value: category.id,
              }))}
              portalProps={{
                className: "select-menu-list",
              }}
              onChange={event => setSelectedCategories(event)}
            />
            <div className="mb-6">
              <div className="mb-1 flex items-center justify-between">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="description"
                >
                  Description<span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-gray-500">
                  {description.length}/0
                </span>
              </div>
              <textarea
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="description"
                placeholder="Enter description"
                rows={10}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded-md border border-transparent bg-black px-4 py-2 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
