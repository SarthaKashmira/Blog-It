import axios from "axios";

import { getFromLocalStorage } from "../utils/storage";

const userId = getFromLocalStorage("authUserId");

const fetch = () => axios.get("api/v1/posts");

const create = payload => {
  logger.info(userId);
  axios.post("/api/v1/posts", { post: { ...payload, user_id: userId } });
};

const show = slug => axios.get(`/api/v1/posts/${slug}`);

const update = ({ payload, slug }) =>
  axios.put(`api/v1/posts/${slug}`, { post: payload });

const destroy = slug => axios.delete(`api/v1/posts/${slug}`);

const postsApi = { fetch, create, show, update, destroy };

export default postsApi;
