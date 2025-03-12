import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import {
  ActionDropdown,
  Button,
  Dropdown,
  Typography,
} from "@bigbinary/neetoui";
import { useHistory, Link } from "react-router-dom";

import postsApi from "../../apis/posts";

const Header = ({ formType = "New", slug, setStatus, status, updated }) => {
  const history = useHistory();
  const date = new Date(updated);
  const handleDelete = async () => {
    try {
      await postsApi.destroy(slug);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="mb-4 flex justify-between">
      <h1 className="text-4xl font-bold text-gray-900">{formType} blog post</h1>
      <div className="space-x-2">
        {status === "Save as Draft" && (
          <Typography className="inline-block">
            Draft saved at {date.toLocaleString()}
          </Typography>
        )}
        <Link target="_blank" to={`/post/${slug}`}>
          <ExternalLink className="inline-block" />
        </Link>
        {formType === "Edit" && (
          <Button className="text-black " label="Cancel" style="secondary" />
        )}
        <ActionDropdown
          buttonStyle="secondary"
          label={status}
          onClickOutside={function noRefCheck() {}}
          onClose={function noRefCheck() {}}
        >
          <ul>
            <li onClick={() => setStatus("Save as Draft")}>Save as Draft</li>
            <li onClick={() => setStatus("Publish")}>Publish</li>
          </ul>
        </ActionDropdown>
        {formType === "Edit" && (
          <Dropdown buttonStyle="text" label="...">
            <ul>
              <li
                className="cursor-pointer px-4 py-2 text-red-600 hover:bg-red-100"
                onClick={handleDelete}
              >
                Delete
              </li>
            </ul>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Header;
