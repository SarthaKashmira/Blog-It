import React, { useEffect, useState } from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Dropdown, Table, Typography } from "@bigbinary/neetoui";

import postsApi from "../../apis/posts";
import { PageLoader } from "../commons";

const MyBlogs = () => {
  const { Menu, MenuItem, Divider } = Dropdown;
  const { Button: MenuButton } = MenuItem;

  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const {
        data: { user_posts },
      } = await postsApi.fetch();
      setMyBlogs(user_posts);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDelete = async slug => {
    try {
      await postsApi.destroy(slug);
      fetchDetails();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleUpdate = async (text, slug) => {
    try {
      const payload = { status: text === "publish" ? "draft" : "publish" };
      await postsApi.update({ payload, slug });
      fetchDetails();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="mx-2 max-w-4xl py-8">
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">My blog posts</h1>
          <p className="text-sm text-gray-600">{myBlogs.length} articles</p>
        </div>
      </div>
      <Table
        rowSelection
        currentPageNumber={1}
        defaultPageSize={10}
        handlePageChange={() => {}}
        columnData={[
          {
            dataIndex: "title",
            key: "title",
            title: "Title",
            width: 250,
          },
          {
            dataIndex: "category",
            key: "category",
            title: "Category",
            width: 200,
          },
          {
            dataIndex: "last_published_at",
            key: "last_published_at",
            title: "Last Published At",
            width: 200,
          },
          {
            dataIndex: "status",
            key: "status",
            title: "Status",
            width: 150,
            render: (text, record) => (
              <div className="flex justify-between">
                <Typography>
                  {text === "publish" ? "Published" : "Draft"}
                </Typography>
                <Dropdown
                  buttonStyle="text"
                  icon={MenuHorizontal}
                  position="bottom-end"
                  strategy="fixed"
                >
                  <Menu>
                    <MenuItem>
                      <MenuButton
                        className="text-black"
                        style="link"
                        onClick={() => handleUpdate(text, record.key)}
                      >
                        {text === "publish" ? "Unpublish" : "Publish"}
                      </MenuButton>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <MenuButton
                        label="Delete"
                        style="danger"
                        type="delete"
                        onClick={() => handleDelete(record.key)}
                      >
                        Delete
                      </MenuButton>
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </div>
            ),
          },
        ]}
        rowData={myBlogs.map(item => ({
          key: item.slug,
          title: item.title,
          category: item.categories.map(category => category.name).join(", "),
          last_published_at: new Date(item.updated_at).toLocaleString(),
          status: item.status,
        }))}
        onRowClick={() => {}}
        onRowSelect={() => {}}
      />
    </>
  );
};

export default MyBlogs;
