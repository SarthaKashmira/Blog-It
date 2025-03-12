import React from "react";

import { File, Edit, Blockquote } from "@bigbinary/neeto-icons";
import { Avatar } from "@bigbinary/neetoui";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const getLinkClasses = path =>
    classNames(
      "mb-4 p-2 rounded-lg",
      { "bg-gray-200": location.pathname === path }, // Active link styling
      { "hover:bg-gray-100": location.pathname !== path } // Hover effect for inactive links
    );

  return (
    <div className="flex h-screen w-20 flex-col items-center border-r border-gray-300 py-6">
      <Link className={getLinkClasses("/")} to="/">
        <File />
      </Link>
      <Link
        className={getLinkClasses("/create_new_post")}
        to="/create_new_post"
      >
        <Edit />
      </Link>
      <Link className={getLinkClasses("/my_posts")} to="/my_posts">
        <Blockquote />
      </Link>
      <div className="flex-1" />
      <Avatar user={{ name: "Sarthak Kashmira" }} />
    </div>
  );
};

export default Sidebar;
