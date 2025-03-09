import axios from "axios";
import qs from "qs";
import { User } from "@/lib/types";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

export const fetchUsers = async () => {
  return await axiosClient.get("/users");
};

export const fetchUser = async (id: string) => {
  return await axiosClient.get(`/users/${id}`);
};

export const createUser = async (data: User) => {
  const urlEncodedData = qs.stringify(data);
  return await axiosClient.post("/users", urlEncodedData);
};
