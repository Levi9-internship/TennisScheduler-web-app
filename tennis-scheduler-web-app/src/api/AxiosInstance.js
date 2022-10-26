import axios from 'axios';

const token = localStorage.getItem("token");

let instance;

if (!token)
    instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });
else
    instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL, headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } });

export const axiosInstance = instance;