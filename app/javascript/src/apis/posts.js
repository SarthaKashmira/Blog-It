import axios from "axios";

import { getFromLocalStorage } from "../utils/storage";

const userId = getFromLocalStorage("authUserId");

const fetch = () => axios.get("api/v1/posts");

const create = payload => {
  logger.info(userId);
  axios.post("/api/v1/posts", { post: { ...payload, user_id: userId } });
};

const show = slug => axios.get(`/api/v1/posts/${slug}`);
const postsApi = { fetch, create, show };

export default postsApi;
