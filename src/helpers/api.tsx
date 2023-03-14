import axios from "axios";

const httpRequest = axios.create({
  baseURL: "https://api.n.xyz/api/v1/",
  headers: { accept: "application/json" },
});

export const get = async (path: any, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export default httpRequest;
