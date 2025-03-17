import React, { useState } from "react";

import { Delete, Filter } from "@bigbinary/neeto-icons";
import {
  ActionDropdown,
  Alert,
  Button,
  Checkbox,
  Dropdown,
  Pane,
} from "@bigbinary/neetoui";

import PaneContent from "./PaneContent";

import postsApi from "../../../apis/posts";

const MyBlogsHeader = ({ myBlogsLength, setMyBlogs, selectedKeys }) => {
  const [openPane, setOpenPane] = useState(false);
  const [alert, setAlert] = useState(false);
  const { Menu, MenuItem } = ActionDropdown;
  const { Button: MenuItemButton } = MenuItem;

  const handleDeleteAll = async () => {
    try {
      await postsApi.destroyAll({
        payload: { slugs: selectedKeys },
      });
      setAlert(false);
      window.location.href = "/my_posts";
    } catch (error) {
      logger.error(error);
    }
  };

  const handleUpdateAll = async status => {
    try {
      await postsApi.updateAll({
        payload: {
          updates: selectedKeys.map(key => ({
            slug: key,
            status,
          })),
        },
      });
      window.location.href = "/my_posts";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="m-1 flex items-center justify-between">
      {/* Heading and post counts are here */}
      <div className="m-1 flex flex-col space-y-1">
        <h1 className="text-3xl font-bold text-gray-900">My blog posts</h1>
        <p className="text-sm text-gray-600">{myBlogsLength} articles</p>
      </div>
      {/* Dropdown and filter section starts from here */}
      {selectedKeys.length > 0 && (
        <div className="flex">
          <Dropdown
            label="Change status"
            onClickOutside={function noRefCheck() {}}
            onClose={function noRefCheck() {}}
          >
            <Menu onClick={event => handleUpdateAll(event.target.id)}>
              <MenuItemButton id="draft">Draft</MenuItemButton>
              <MenuItemButton id="publish">Publish</MenuItemButton>
            </Menu>
          </Dropdown>
          <Button
            className="ml-2"
            icon={Delete}
            label="Delete"
            style="danger"
            onClick={() => setAlert(true)}
          />
        </div>
      )}
      {selectedKeys.length === 0 && (
        <div className="flex">
          <ActionDropdown
            buttonStyle="primary"
            label="Columns"
            onClick={function noRefCheck() {}}
          >
            <Menu>
              <Checkbox
                checked
                disabled
                className="m-1"
                id="checkbox_name"
                label="Title"
              />
              <Checkbox
                checked
                className="m-1"
                id="checkbox_name"
                label="Category"
              />
              <Checkbox
                checked
                className="m-1"
                id="checkbox_name"
                label="Last published at"
              />
              <Checkbox
                checked
                className="m-1"
                id="checkbox_name"
                label="Status"
              />
            </Menu>
          </ActionDropdown>
          <Filter className="ml-2" onClick={() => setOpenPane(true)} />
        </div>
      )}
      <Pane isOpen={openPane} onClose={() => setOpenPane(false)}>
        <PaneContent {...{ setMyBlogs, setOpenPane }} />
      </Pane>
      <Alert
        hideCancelButton
        isOpen={alert}
        message="Are you sure you want to delete the selected posts?"
        submitButtonLabel="Confirm"
        title="Delete selected posts"
        onClose={() => setAlert(false)}
        onSubmit={handleDeleteAll}
      />
    </div>
  );
};

export default MyBlogsHeader;
