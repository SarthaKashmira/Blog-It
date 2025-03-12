import React, { useEffect, useState } from "react";

import { Input, Select } from "@bigbinary/neetoui";
import { useParams, useHistory } from "react-router-dom";

import { PageLoader } from "./commons";
import Header from "./commons/Header";

import categoriesApi from "../apis/categories";
import postsApi from "../apis/posts";

const EditBlog = () => {
  const history = useHistory();
  const { slug } = useParams();
  const [postUpdate, setPostUpdate] = useState({});
  const [categoriesShow, setCategoriesShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Publish");

  const fetchPost = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPostUpdate(post);
      setStatus(post.status === "publish" ? "Publish" : "Save as Draft");
    } catch (error) {
      logger.error(error);
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

  const fetchDetails = async () => {
    try {
      await Promise.all([fetchPost(), fetchCategories()]);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const payload = {
        title: postUpdate.title,
        description: postUpdate.description,
        slug: postUpdate.slug,
        is_bloggable: postUpdate.is_bloggable,
        category_ids: postUpdate.categories.map(category => category.value),
        organization_id: postUpdate.organization.id,
        user_id: postUpdate.user.id,
        status: status === "Publish" ? "publish" : "draft",
      };
      await postsApi.update({ payload, slug });
      history.goBack();
    } catch (error) {
      logger.error(error);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <Header
            formType="Edit"
            updated={postUpdate.updated_at}
            {...{ setStatus, status, slug }}
          />
          <form onSubmit={event => handleSubmit(event)}>
            <Input
              className="mb-6"
              label="Title *"
              placeholder="Enter title"
              value={postUpdate.title}
              onChange={event =>
                setPostUpdate({ ...postUpdate, title: event.target.value })
              }
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
              defaultValue={postUpdate.categories.map(category => ({
                label: category.name,
                value: category.id,
              }))}
              options={categoriesShow.map(category => ({
                label: category.name,
                value: category.id,
              }))}
              portalProps={{
                className: "select-menu-list",
              }}
              onChange={event =>
                setPostUpdate({ ...postUpdate, categories: event })
              }
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
                  {postUpdate.description.length}/0
                </span>
              </div>
              <textarea
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="description"
                placeholder="Enter description"
                rows={10}
                value={postUpdate.description}
                onChange={e =>
                  setPostUpdate({ ...postUpdate, description: e.target.value })
                }
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

export default EditBlog;
