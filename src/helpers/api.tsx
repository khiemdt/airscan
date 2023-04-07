import axios from 'axios';
import { API_KEY } from '../constants/constant';

let index = 0;
const httpRequest = axios.create({
    baseURL: 'https://api.n.xyz/api/v1/',
    headers: { accept: 'application/json' },
});

export const get = async (path: any, options: any) => {
    const params = { ...options?.params, apikey: API_KEY[index] }; // thêm object mới
    index = (index + 1) % API_KEY.length;
    const response = await httpRequest.get(path, { ...options, params }); // merge params vào options
    return response.data;
};
export default httpRequest;
