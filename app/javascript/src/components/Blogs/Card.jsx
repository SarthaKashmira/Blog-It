import React from "react";

import { Typography } from "@bigbinary/neetoui";

const Card = ({ id, title, description, created_at }) => (
  <div className="relative w-full" key={id}>
    <div className="pb-6">
      <Typography className="mb-2 text-xl font-bold" style="h2">
        {title}
      </Typography>
      <Typography className="mb-2 text-sm text-gray-600">
        {description}
      </Typography>
      <Typography className="mb-2 text-sm text-gray-600">
        {created_at.split("T")[0]}
      </Typography>
    </div>
    <div className="absolute bottom-0 left-0 w-full border-b border-gray-200" />
  </div>
);

export default Card;
