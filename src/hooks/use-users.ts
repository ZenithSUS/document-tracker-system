import { fetchUser, fetchUsers } from "@/actions/users";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/lib/types";

export const useFetchUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await fetchUsers();
      console.log(data);
      return data;
    },
  });
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
