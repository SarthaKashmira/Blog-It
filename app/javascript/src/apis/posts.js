import axios from "axios";

import { getFromLocalStorage } from "../utils/storage";

const userId = getFromLocalStorage("authUserId");

const fetch = payload => axios.get("api/v1/posts", { params: { ...payload } });

const create = payload => {
  logger.info(userId);
  axios.post("/api/v1/posts", { post: { ...payload, user_id: userId } });
};

const show = slug => axios.get(`/api/v1/posts/${slug}`);

const update = ({ payload, slug }) =>
  axios.put(`api/v1/posts/${slug}`, { post: payload });

const destroy = slug => axios.delete(`api/v1/posts/${slug}`);

const destroyAll = ({ payload }) =>
  axios.delete("api/v1/posts/bulk_delete", { data: { ...payload } });

const updateAll = ({ payload }) =>
  axios.patch("api/v1/posts/bulk_update", { ...payload });

const generatePdf = slug => axios.post(`api/v1/posts/${slug}/report`, {});

const download = slug =>
  axios.get(`api/v1/posts/${slug}/report/download`, { responseType: "blob" });

const postsApi = {
  fetch,
  create,
  show,
  update,
  destroy,
  destroyAll,
  updateAll,
  generatePdf,
  download,
};

export default postsApi;
