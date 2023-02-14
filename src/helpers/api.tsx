import axios from "axios";

const httpRequest = axios.create({
  baseURL: "https://api.solscan.io/",
});

export const get = async (path: any, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export default httpRequest;
