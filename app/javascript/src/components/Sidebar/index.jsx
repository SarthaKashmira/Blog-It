import React from "react";

import { Avatar, Typography } from "@bigbinary/neetoui";

const Sidebar = () => (
  <div className="flex h-screen w-20 flex-col items-center border-r border-gray-300 py-6">
    <Typography className="mb-8 h-10 w-10 rounded-full bg-gray-700" />
    <div className="mb-4 h-8 w-8 rounded bg-gray-700" />
    <div className="flex-1" />
    <Avatar user={{ name: "Sarthak Kashmira" }} />
  </div>
);

export default Sidebar;
