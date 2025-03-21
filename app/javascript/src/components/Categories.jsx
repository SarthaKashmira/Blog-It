import React, { useEffect, useState } from "react";

import { Plus, Search } from "@bigbinary/neeto-icons";
import { Button, Modal, Input, Typography } from "@bigbinary/neetoui";

import categoriesApi from "../apis/categories";

const Categories = () => {
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [category, setCategory] = useState("");
  const [categoriesShow, setCategoriesShow] = useState([]);

  const handleCategorySubmit = async () => {
    try {
      await categoriesApi.create({ name: category });
      setOpenAddCategory(false);
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

  useEffect(() => {
    fetchCategories();
  }, [openAddCategory]);

  return (
    <div>
      <div className="h-full w-64 bg-gray-100 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">CATEGORIES</h2>
          <div className="flex space-x-2">
            <Button style="link" onClick={() => setOpenAddCategory(true)}>
              <Plus />
            </Button>
            <Search />
          </div>
        </div>
        {categoriesShow.map((category, index) => (
          <Typography
            className="m-4 rounded-md bg-gray-200 p-3 text-gray-800"
            key={index}
            style="h3"
          >
            {category.name}
          </Typography>
        ))}
      </div>
      <Modal isOpen={openAddCategory} onClose={() => setOpenAddCategory(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">New category</h2>
            </div>
            <Input
              label="Category Title"
              placeholder="Add Category"
              value={category}
              onChange={event => setCategory(event.target.value)}
            />
            <div className="mt-2 flex">
              <Button
                className="mx-2 bg-black text-white"
                label="Add"
                onClick={handleCategorySubmit}
              />
              <Button className="bg-transparent text-black" label="Cancel" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Categories;
