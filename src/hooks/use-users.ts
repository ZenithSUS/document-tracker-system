import { fetchUser, fetchUsers } from "@/actions/users";
import { useState, useEffect } from "react";

export const useFetchUsers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUsers();
        setData(response.data);
      } catch (err: any) {
        setError(err);
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, isLoading };
};

export const usefetchUser = async (userId: string) => {
  try {
    const response = await fetchUser(userId);
    return response.data;
  } catch (err: any) {
    console.error("Failed to fetch user:", err);
    throw err;
  }
};
