import React from "react";

import { Tag, Typography } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

const Card = ({
  id,
  title,
  description,
  created_at,
  slug,
  user_name,
  categories,
}) => (
  <div className="relative w-full" key={id}>
    <div className="pb-6">
      {categories.map(category => (
        <Tag
          className="m-1"
          key={category.id}
          label={category.name}
          style="success"
          type="outline"
        />
      ))}
      <Link to={`/post/${slug}`}>
        <Typography className="mb-2 text-xl font-bold" style="h2">
          {title}
        </Typography>
      </Link>
      <Typography className="mb-2 text-sm text-gray-600">
        {description}
      </Typography>
      <Typography className="mb-1 text-sm font-bold text-black">
        Author:- {user_name}
      </Typography>
      <Typography className="mb-2 text-sm text-gray-600">
        Published On:- {created_at.split("T")[0]}
      </Typography>
    </div>
    <div className="absolute bottom-0 left-0 w-full border-b border-gray-200" />
  </div>
);

export default Card;
