import { fetchUser, fetchUsers, createUser } from "@/actions/users";
import {
  useQueryClient,
  useQuery,
  useMutation,
  UseBaseMutationResult,
  QueryObserverResult,
} from "@tanstack/react-query";
import { AddUser, User } from "@/lib/types";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

export const useFetchUsers = (): QueryObserverResult<User[]> => {
  return useQuery<User[]>({
    queryFn: async () => {
      const { data } = await fetchUsers();
      return data;
    },
    queryKey: ["users"],
  });
};

export const usefetchUser = (userId: string): QueryObserverResult<User> => {
  return useQuery<User>({
    queryFn: async () => {
      const { data } = await fetchUser(userId);
      return data;
    },
    queryKey: ["user", userId],
  });
};

export const useCreateUser = (): UseBaseMutationResult<
  AxiosResponse<AddUser>,
  unknown,
  User
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AddUser) => await createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error("Failed to add user. Try Again.");
      console.error("Error adding user:", error);
    },
  });
};
