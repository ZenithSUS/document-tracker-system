import axios from "axios";
import qs from "qs";
import { Documents } from "@/lib/types";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

export const fetchDocuments = async () => {
  return await axiosClient.get("/documents");
};

export const fetchDocument = async (id: string) => {
  return await axiosClient.get(`/documents/${id}`);
};

export const createDocument = async (data: Documents) => {
  const urlEncodedData = qs.stringify(data);
  return await axiosClient.post("/documents", urlEncodedData);
};

export const editDocument = async (data: Documents) => {
  const urlEncodedData = qs.stringify(data);
  return await axiosClient.put("/documents", urlEncodedData);
};

export const deleteDocument = async (id: string) => {
  return await axiosClient.delete(`/documents/${id}`);
};
