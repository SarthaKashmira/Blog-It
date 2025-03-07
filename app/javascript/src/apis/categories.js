import axios from "axios";

const create = payload =>
  axios.post("/api/v1/categories", { category: payload });

const fetch = () => axios.get("/api/v1/categories");

const categoriesApi = { create, fetch };

export default categoriesApi;
