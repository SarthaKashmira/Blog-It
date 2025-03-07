import React from "react";

import { File, Edit, Blockquote } from "@bigbinary/neeto-icons";
import { Avatar } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="flex h-screen w-20 flex-col items-center border-r border-gray-300 py-6">
    <Link to="/">
      <File className="mb-4" />
    </Link>
    <Link to="/create_new_post">
      <Edit className="mb-4" />
    </Link>
    <Link to="/">
      <Blockquote className="mb-4" />
    </Link>
    <div className="flex-1" />
    <Avatar user={{ name: "Sarthak Kashmira" }} />
  </div>
);

export default Sidebar;
