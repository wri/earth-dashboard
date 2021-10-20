import axios from "axios";

export const WRIAPI = axios.create({
  baseURL: process.env.WRI_API_URL,
  headers: { "Content-Type": "application/json" }
});

export const blogAPI = axios.create({
  baseURL: process.env.BLOG_API_URL,
  headers: { "Content-Type": "application/json" }
});

export const localAPI = axios.create({
  baseURL: "/",
  headers: { "Content-Type": "application/json" }
});

export const GCAAPI = axios.create({
  baseURL: process.env.GCA_API_URL,
  headers: { "Content-Type": "application/json" }
});

const APIs = {
  WRIAPI,
  blogAPI,
  GCAAPI,
  localAPI
};

export default APIs;
